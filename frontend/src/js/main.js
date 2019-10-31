import Header from "./Components/header";
import Footer from "./Components/footer";
import Todos from "./Components/todos";
import apiActions from "./API/api-actions";
import Home from "./Components/home";


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

    toDosButton.addEventListener("click", function(){
        apiActions.getRequest("https://localhost:44305/api/todos", toDos => {
            document.querySelector("#app").innerHTML = Todos(toDos);
        });
    });
}