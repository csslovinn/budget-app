//sample data array
/*var list = [{name : 'Mom', actual : '78.00', active : true}, 
           {name : 'Kimberly', actual : '32.78', active : true}, 
           {name : 'Emily', actual : '54.00', active : true}, 
           {name : 'Yasmine', actual : '45.00', active : true}, 
           {name : 'Amy', actual : '28.00', active : true}];*/
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
    
function writeList (person){
        //check for missing person name data
        if (typeof person.name == 'undefined'){
            throw "Name is missing!";
        } 
        else {
        $("<li class='list-group-item cf'>" + person.name.charAt(0).toUpperCase() + person.name.substring(1) + "<div class='actual-spent'>$<form class='actual'><input type='text' class='amount' placeholder='0.00' id='" + person.id + "'><div class='glyphicon glyphicon-remove'></div></div></form></li>").appendTo('.list-group');
        }
    }

function addPerson(name) {
    var newPerson = new Person(name);
    list.push(newPerson);
    writeList(newPerson);
    }

//test data
//var budgetTotal = 1000;
//var totalSpent = 100; 

//count how many list items are active
function countActive(){
    var activeCount = 0;
    for (var i=0; i < list.length; i++){
        if (list[i].active == true){
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
        spent += parseInt(list[i].actual);
        }else {
            i++;
        }
    }
    $('#spent-so-far').remove();
    $('#spent').append("<div id='spent-so-far'>" + spent.toFixed(2) + "</div>");
    return spent;
}
//calculate average budget per person and allows edits to overwrite (change the divs by taking the input and then using.text)
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
    /*console.log(actualSpent);
    console.log($(this).find('input').attr('id'));*/
    for (var i=0; i < list.length; i++){
        if ($(this).find('input').attr('id') == list[i].id){
             list[i].actual = actualSpent;
             list[i].active = false;
        }
    }
    totalISpent();
    var budgetTotal = $('#budget-total').text();
    getAverage(budgetTotal); //this doesn't work here without budgetTotal
    $(this).find('input').val('');
});
}

$(document).ready(function() {
    //default hide list
    //$('#list').hide();
    //$('#set-up-2').hide();
    //create list
    $("<ul class='list-group'>").appendTo("#place-list");
    for (var i=0; i < list.length; i++){
        try {
            writeList(list[i]);
        }catch(error){
            console.log("Error:" + error);
        }
    }//end error handling

    $('#total-budget').on('submit', function(event){
        event.preventDefault();
        var budgetTotal = $('#budget-input').val();
        getAverage(budgetTotal);
        $('#budget-total').remove();
        $('#initial-budget').append("<div id='budget-total'>" + budgetTotal +"</div>");
        $('#budget-input').val('');
    });
    
    $('#recipients').on('submit', function(event){
        event.preventDefault();
        var recipient = $('#new-person').val();
        addPerson(recipient);
        $('input').val('');
    }); 
    
    /*$('#recipients-done').on('submit', function(event){
        event.preventDefault();
        $('#set-up-1').hide();
        $('#set-up-2').show();
        
    });
    
    $('#budget-done').on('submit', function(event){
        event.preventDefault();
        $('#set-up-2').hide();
        $('#list').show();
        
    });*/
    
    /*$('#edit-button').on('submit', function(event){
        event.preventDefault();
        $('#list').hide();
        $('#edit-page').show();
    });*/

    /*$('#view-list').on('submit', function(event){
        event.preventDefault();
        $('#edit-page').hide();
        $('#list').show();
    });*/

    getActualSpentId();
    /*$('.glyphicon-remove').click(function() {
    }); do this if have time*/
    
    /*$('.actual').on('submit', function(event){
        event.preventDefault();
        var actualSpent = $(this).find('input').val();
        console.log(actualSpent);
        console.log($(this).find('input').attr('class'));
        $(this).find('input').val('');
    });*/

});



