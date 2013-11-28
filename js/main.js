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
        $("<li class='list-group-item cf'>" + person.name.charAt(0).toUpperCase() + person.name.substring(1) + "<div class='actual-spent'>$<form class='actual'><input type='text' class='amount' placeholder='0.00' id='" + person.id + "'></div></form>" + "</li>").appendTo('.list-group');
        }
    }

function addPerson(name) {
    var newPerson = new Person(name);
    list.push(newPerson);
    writeList(newPerson);
    getActualSpentId();
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
//calculate average budget per person
function getAverage(budgetTotal){
    var activeCount = countActive();
    //remaining budget = total budget - actual spent
    var remaining = (budgetTotal - totalSpent);
    $('#remaining').append('$' + remaining.toFixed(2));
    var average = (remaining / activeCount);
    $('#per-person').append('$' + average.toFixed(2));
    }

//on submit grab value assign it to Person "actual" and change status to false  
function getActualSpentId(){
    $('.actual').on('submit', function(event){
        event.preventDefault();
    var actualSpent = $(this).find('input').val();
    console.log(actualSpent);
    console.log($(this).find('input').attr('id'));
    for (var i=0; i < list.length; i++){
        if ($(this).find('input').attr('id') == list[i].id){
             list[i].actual = actualSpent;
             list[i].active = false;
        }
    }
    $(this).find('input').val('');
});
}

$(document).ready(function() {
    //create list
    $("<ul class='list-group'>").appendTo(".panel-body");
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
        $('#initial-budget').append('$' + budgetTotal);
        $('#budget-input').val('');
    });
    
    $('#recipients').on('submit', function(event){
        event.preventDefault();
        var recipient = $('#new-person').val();
        addPerson(recipient);
        $('input').val('');
    }); 
    
    /*$('.actual').on('submit', function(event){
        event.preventDefault();
        var actualSpent = $(this).find('input').val();
        console.log(actualSpent);
        console.log($(this).find('input').attr('class'));
        $(this).find('input').val('');
    });*/

});



