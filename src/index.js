import "./styles.css"
import { renderStoredProjects, showProject } from "./userInterface"
import { projectsArray, loadFromLocalStorage, returnUrgentTodos, returnDeletePastTodos } from "./programLogic";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    console.log("Proyectos: ", projectsArray);
    renderStoredProjects();
    /*returnDeletePastTodos();*/
    
});

document.querySelector("#new").addEventListener("click", function(){
    if(document.querySelector("#project-creation").innerHTML !== "") return;
    showProject();
});


