import "./styles.css"
import { showProject } from "./userInterface"
import { projectsArray, createProject, createTodo, loadFromLocalStorage } from "./programLogic";

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    console.log("Proyectos: ", projectsArray);
});

document.querySelector("#new").addEventListener("click", function(){
    if(document.querySelector("#project-creation").innerHTML !== "") return;
    showProject();
});
