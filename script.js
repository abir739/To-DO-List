//Select the elements
const refresh = document.querySelector(".refresh");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// get the Date
const today = new Date();
const options = { weekday:'long', month:'short', day:'numeric'};
date.innerHTML = today.toLocaleDateString("en-US", options);

//add the list of the todo
let List = [];
let id = 0;
const checked = "fa-check-circle";
const unchecked = "fa-circle-thin";
const line_through = "lineThrough";

//Creat the function: add a to do in the list
function addToDo(toDo,id ,done, trash){

    if(trash){ return; }

    const DONE = done ? checked : unchecked;

    const LINE = done ? line_through : "";

    const text = `<li class="item">
                   <i class="fa ${DONE}  complete" action="complete" id="${id}"></i>
                   <p class="text">${toDo} </p>
                   <i class="fa ${LINE} delete" action="delete"  id="${id}"></i>
                   </li>`
    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
                   
}

addToDo("Read Coran");

//Add a to do when we press on the Enter Key with the Keycode=13
document.addEventListener("keyup", function(event){

    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);
            List.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
        }
      
            input.value ="";
            id++;
       
    }
});

// create function for the To-do is Done
// function completeToDo(element){
//     element.classList.toggle(checked);
//     element.classList.toggle(unchecked);
//     element.patentNode.querySelector(".text").classList.toggle(line_through);
//     List[element.id].done = List[element.id].done ? false : true;
// }
function completeToDo(element) {
    if (element.parentNode) {
    element.classList.toggle(checked);
    element.classList.toggle(unchecked);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    List[element.id].done = !List[element.id].done;
    }
    }

//create function to remove a to-do, we will use removeChild method
// function removeToDo(element){
//     element.patentNode.patentNode.removeChild(element.patentNode);
//     List[element.id].trash = true;
// }
function removeToDo(element) {
    if (element.parentNode && element.parentNode.parentNode) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    List[element.id].trash = true; // Signify the item was deleted
    }
    }

// add eventListener for the trash and the check circle
list.addEventListener("click", function(event){
    let element = event.target;
    const elementAction = event.target.attributes.action.value;
    
    if(elementAction == "complete"){
        completeToDo(element);
    }
    else if(elementAction == "delete"){
        removeToDo(element);
    }
})

// Save the to-do list to the localStore
// localStorage.setItem('key', 'value');
// let variable = localStorage.getItem('key');
// localStorage.setItem("toDo", JSON.stringify(List));

// Create function to restore to-do list from localStorage
let data = localStorage.getItem("toDo");
if(data){
    List = JSON.parse(data);
    loadToDo(List);
    id = List.length;
}
else{
    List = [];
    id = 0;
}

function loadToDo( array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Clear localStorage
refresh.addEventListener('click', function(){
    localStorage.clear();// clear the page
    location.reload(); // reload the page
});

