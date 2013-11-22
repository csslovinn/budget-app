var budgetTotal // grab number entered into #total-budget
var totalRemaining // calculated by budgetTotal - 

//constructor function newPerson
function NewPerson(name){
    this.name = name;
    this.actual = null;
    this.active = true;
    }

//sample data array
var list = [{name : 'Mom', actual : '78.00', active : true}, 
           {name : 'Kimberly', actual : '32.78', active : true}, 
           {name : 'Emily', actual : '54.00', active : true}, 
           {name : 'Yasmine', actual : '45.00', active : true}, 
           {name : 'Amy', actual : '28.00', active : true}];

//math functions
    //remaining budget = total budget - actual spent
    //remaining budget divided by number of active list items = per person
    //count how many list items are active

function countActive(){
    var activeCount = 0;
    for (var i=0; i < list.length; i++){
        if (list.active == true){
            
        }
    }
}

var totalRemaining = 1000;

function getAverage(){
    var average = (totalRemaining / activeCount);
    }



