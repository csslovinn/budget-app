var list = [];

//creates unique id for each person by incrementation
function uniqueId() {
    // Check to see if the counter has been initialized
    if ( typeof uniqueId.counter == 'undefined' ) {
        // It has not... perform the initilization
        uniqueId.counter = 0;
    }
    return uniqueId.counter++;
}

//constructor function newPerson
function Person(name){
    this.name = name;
    this.actual = null;
    this.active = true;
    var id = uniqueId();
    this.id = id;
    }

//generates list    
function writeList (person){
        //check for and do not allow empty input for recipient name
        if (person.name === ""){
            throw "Name is missing!";
        } if (person.active === false){
           $("<li class='list-group-item cf done'>" + person.name.charAt(0).toUpperCase() + person.name.substring(1) + "<div class='actual-spent'>$<form class='actual'><input type='text' class='amount' placeholder='0.00' id='" + person.id + "' pattern='^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'></div></form></li>").appendTo('.list-group'); 
        }
        else {
        //even though removed, keep full structure of li to keep intact for future features
        $("<li class='list-group-item cf'>" + person.name.charAt(0).toUpperCase() + person.name.substring(1) + "<div class='actual-spent'>$<form class='actual'><input type='text' class='amount' placeholder='0.00' id='" + person.id + "' pattern='^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'></div></form></li>").appendTo('.list-group');
        }
    }

//add a new person to the list
function addPerson(name) {
    var newPerson = new Person(name);
    list.push(newPerson);
    writeList(newPerson);
    }

//count how many list items are active
function countActive(){
    var activeCount = 0;
    for (var i=0; i < list.length; i++){
        if (list[i].active === true){
        activeCount++;
        }
    }
    return activeCount;
}

//calculate and recalculate total spent from actual spents
function totalISpent(){
    var spent = 0;
    for (var i=0; i < list.length; i++){
        if ($.isNumeric(list[i].actual)) {
        spent += parseInt(list[i].actual, 10);
        }
    }
    $('#spent-so-far').remove();
    $('#spent').append("<div id='spent-so-far'>" + spent.toFixed(2) + "</div>");
    return spent;
}
//calculate average budget per person and allows edits to overwrite
function getAverage(budgetTotal){
    var activeCount = countActive();
    //remaining budget = total budget - actual spent
    var totalSpent = totalISpent();
    var remaining = (budgetTotal - totalSpent);
    $('#total-remaining').remove();
    $('#remaining').append("<div id='total-remaining'>" + remaining.toFixed(2) + "</div>");
    var average = (remaining / activeCount);
    if ($.isNumeric(average)){
        $('#average-budget').remove();
        $('#per-person').append("<div id='average-budget'>" + average.toFixed(2) + "</div>");
    } else {
        $('#per-person').append("<div id='average-budget'></div>");
    }
    }

//on submit grab value assign it to Person "actual" and change status to false, recalculate total spent  
function getActualSpentId(){
    $('.container').on('submit', '.actual', function(event){
        event.preventDefault();
    var actualSpent = $(this).find('input').val();
    for (var i=0; i < list.length; i++){
        if ($(this).find('input').attr('id') == list[i].id){
             list[i].actual = actualSpent;
             list[i].active = false;
             localStorage.setItem('list', JSON.stringify(list));
        }
    }
    totalISpent();
    var budgetTotal = $('#budget-total').text();
    getAverage(budgetTotal); //this doesn't work here without budgetTotal
    //remove person from list
    $(this).closest('li').addClass('done');
    $(this).find('input').val('');
});
}

$(document).ready(function() {
    
    //get list data from local storage
    if (localStorage.getItem('list') !== null){
        list = JSON.parse(localStorage.getItem('list'));
        //show list if data is already present
        $('#edit-page').hide();
        $('#list').show();
    } else {
        //default to set-up if no data present
        $('#list').hide();
        $('#set-up-2').hide();
    }

    //get budget data from local storage
    if (localStorage.getItem('budgetTotal') !== null){
        var budgetTotal = JSON.parse(localStorage.getItem('budgetTotal'));
        getAverage(budgetTotal);
        $('#budget-total').remove();
        $('#initial-budget').append("<div id='budget-total'>" + budgetTotal +"</div>");
    }

    //localStorage.clear();
     
    //create list
    $("<ul class='list-group'>").appendTo("#place-list");
    for (var j=0; j < list.length; j++){
        try {
            writeList(list[j]);
        }catch(error){
            console.log("Error:" + error);
        }
    }
    //end error handling

    $('#total-budget').on('submit', function(event){
        event.preventDefault();
        var budgetTotal = $('#budget-input').val();
        getAverage(budgetTotal);
        $('#budget-total').remove();
        $('#initial-budget').append("<div id='budget-total'>" + budgetTotal +"</div>");
        $('#budget-input').val('');
        localStorage.setItem('budgetTotal', JSON.stringify(budgetTotal));
    });

    
    $('#recipients').on('submit', function(event){
        event.preventDefault();
        var recipient = $('#new-person').val();
        $('input').val('');
        addPerson(recipient);
        var budgetTotal = $('#budget-total').text();
        getAverage(budgetTotal); //this doesn't work here without budgetTotal
        localStorage.setItem('list', JSON.stringify(list));
    }); 
    
    $('#recipients-done').on('submit', function(event){
        event.preventDefault();
        $('#set-up-1').hide();
        $('#set-up-2').show();
        
    });
    
    $('#budget-done').on('submit', function(event){
        event.preventDefault();
        $('#edit-page').hide();
        $('#set-up-2').hide();
        $('#list').show();
        
    });
    
    $('#edit-button').on('submit', function(event){
        event.preventDefault();
        $('#list').hide();
        $('#edit-page').show();
        $('#set-up-1').show();
        $('#set-up-2').hide();
    });

    $('#view-list').on('submit', function(event){
        event.preventDefault();
        $('#edit-page').hide();
        $('#list').show();
    });
    
    totalISpent();
    getActualSpentId();
});



