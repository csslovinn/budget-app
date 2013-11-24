//sample data array
var list = [{name : 'Mom', actual : '78.00', active : true}, 
           {name : 'Kimberly', actual : '32.78', active : true}, 
           {name : 'Emily', actual : '54.00', active : true}, 
           {name : 'Yasmine', actual : '45.00', active : true}, 
           {name : 'Amy', actual : '28.00', active : true}];

//constructor function newPerson
function Person(name){
    this.name = name;
    this.actual = null;
    this.active = true;
    }
    
function writeList (person){
        //check for missing person name data
        if (typeof person.name == 'undefined'){
            throw "Name is missing!";
        } 
        else {
        $("<li class='list-group-item cf'>" + person.name + "<div class='actual-spent'>$<input type='text' class='amount' placeholder='0.00'></div>" + "</li>").appendTo('.list-group');
        }
    }

function addPerson(name) {
    var newPerson = new Person(name);
    list.push(newPerson);
    writeList(newPerson);
    }

//var budgetTotal = 1000;//test data
var actualSpent = 45.53;//test data

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
function getAverage(){
    var activeCount = countActive();
    //remaining budget = total budget - actual spent
    var remaining = (budgetTotal - actualSpent);
    $('#remaining').append('$' + remaining.toFixed(2));
    var average = (remaining / activeCount);
    $('#per-person').append('$' + average.toFixed(2));
    }

/*function totalSpent(){
    actualSpent = justSpent + actualSpent;
}*/

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
        $('#initial-budget').append('$' + budgetTotal);
        $('#budget-input').val('');
    });
     
});



