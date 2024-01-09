//Select the elements
const refresh = document.querySelector(".refresh");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//add the list of the todo
let List = [];
let id = 0;
const checked = "fa-check-circle";
const unchecked = "fa-circle-thin";
const line_through = "lineThrough";

//Creat the function: add a to do in the list
function addToDo(toDo){

    const text = `<li class="items>
                   <i class="fa fa-circle-thin" action="complete"></i>
                   <p class="text">${toDo} </p>
                   <i class="fa fa-trash" action="delete"></i>
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
