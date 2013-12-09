//var list = [];
//sample data array
var list = [{name : 'Mom', actual : '78.00', active : true}, 
           {name : 'Kimberly', actual : '32.78', active : true}, 
           {name : 'Emily', actual : '54.00', active : true}, 
           {name : 'Yasmine', actual : '45.00', active : true}, 
           {name : 'Amy', actual : '28.00', active : true}];

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
        //check for missing person name data
        if (person.name === ""){
            throw "Name is missing!";
        } 
        else {
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
    $('#average-budget').remove();
    $('#per-person').append("<div id='average-budget'>" + average.toFixed(2) + "</div>");
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
    var listData = localStorage.getItem('list');
    console.log(('listData: ', JSON.parse(listData)));//test, remove console.log
    console.log(listData);//test only, remove
    
    //get budget data from local storage
    var budgetData = localStorage.getItem('budgetTotal');
    console.log(('budgetData: ', JSON.parse(budgetData)));//test, remove console.log
    
    //localStorage.clear();
    
    
     //default hide list
    $('#list').hide();
    $('#set-up-2').hide();
    //create list
    $("<ul class='list-group'>").appendTo("#place-list");
    for (var i=0; i < list.length; i++){
        try {
            writeList(list[i]);
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
    });

    $('#view-list').on('submit', function(event){
        event.preventDefault();
        $('#edit-page').hide();
        $('#list').show();
    });
    
    totalISpent();
    getActualSpentId();
});



