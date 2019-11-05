import Header from "./Components/header";
import Footer from "./Components/footer";
import Todos from "./Components/todos";
import apiActions from "./API/api-actions";
import Home from "./Components/home";
import Todo from "./Components/todo";


export default () =>
{
    Pagebuild();
};

function Pagebuild(){
    header();
    footer();
    navHome();
    navTodos();
};

function header(){
    const header = document.getElementById("header")
    header.innerHTML = Header();
};

function footer(){
    const footer = document.getElementById("footer")
    footer.innerHTML = Footer();
};

function navHome(){
    const homeButton = document.querySelector(".nav__home")
    homeButton.addEventListener('click', function(){
        document.querySelector("#app").innerHTML = Home()
    });
    
}


function navTodos(){
    const toDosButton= document.querySelector(".nav__todos");
    const app = document.querySelector("#app");
    toDosButton.addEventListener("click", function(){
        apiActions.getRequest("https://localhost:44305/api/todos", toDos => {
            document.querySelector("#app").innerHTML = Todos(toDos);
        });
    });

    
    app.addEventListener('click', function(){
        if(event.target.classList.contains("add-toDo__submit")){
            const toDo = event.target.parentElement.querySelector(
                ".add-toDo__toDoName"
            ).value;
            
            console.log(toDo);
            apiActions.postRequest("https://localhost:44305/api/todos",
            {
                name: toDo
            }, 
            toDos => {
                console.log(toDos);
                app.innerHTML = Todos(toDos);
         n    });
        }
    });
    app.addEventListener("click", function(){
        if(event.target.classList.contains("delete-toDo__submit")){
            const toDoID = event.target.parentElement.querySelector(".toDo__id").value;
            console.log("delete" + toDoID)
            apiActions.deleteRequest(`https://localhost:44305/api/todos/${toDoID}`, 
            toDos => {
                app.innerHTML = Todos(toDos);
            })
        }
    });

    app.addEventListener("click", function(){
        if(event.target.classList.contains("edit-toDo__submit")){
            const toDoID = event.target.parentElement.querySelector(".toDo__id").value;
            console.log("edit" + toDoID);
            apiActions.getRequest(
                `https://localhost:44305/api/todos/${toDoID}`,
                toDo => {
                    app.innerHTML= Todo(toDo);
                })
        }
    }) 
    
    app.addEventListener("click", function(){
        if(event.target.classList.contains("update-toDo__submit")){
            const toDoID = event.target.parentElement.querySelector(
                ".update-toDo__id"
                
            ).value;
            const toDoName = event.target.parentElement.querySelector(".update-toDo__name"


            ).value;
            const toDoData = {
                id: toDoID,
                name: toDoName
            }
            apiActions.putRequest(`https://localhost:44305/api/todos/${toDoID}`,
            toDoData,
            todos => {
                app.innerHTML = Todos(todos)
            }
            );
            
        }
    })
    
}