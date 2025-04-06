import "./styles.css"
import { renderStoredProjects, renderUrgentTodos, showProject } from "./userInterface"
import { projectsArray, loadFromLocalStorage, returnUrgentTodos } from "./programLogic";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    console.log("Proyectos: ", projectsArray);
    renderStoredProjects();
});

document.querySelector("#new").addEventListener("click", function(){
    if(document.querySelector("#project-creation").innerHTML !== "") return;
    showProject();
});

document.querySelector("#urgent").addEventListener("click", function(){
    returnUrgentTodos();
    renderUrgentTodos();
});
