import "./styles.css"
import { showProject } from "./userInterface"
import { projectsArray, createProject, createTodo } from "./programLogic";

document.querySelector("#new").addEventListener("click", function(){
    if(document.querySelector("#project-creation").innerHTML !== "") return;
    showProject();
});
