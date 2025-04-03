import {renderTodos} from "./userInterface"
// global array that stores the user projects
const projectsArray = [];

// stores the projectsArray on the localStorage
function saveToLocalStorage(){
    localStorage.setItem("projects", JSON.stringify(projectsArray));
};

// loads the projectsArray from the localStorage
function loadFromLocalStorage(){
    const storedProjects = localStorage.getItem("projects");
    if(storedProjects){
        const parseProjects = JSON.parse(storedProjects);
        projectsArray.length = 0;
        const projectIds = new Set();
        parseProjects.forEach(proj => {
            if(!projectIds.has(proj.id)){
                projectsArray.push(proj);
                projectIds.add(proj.id);
            }
        });
    };
};

// global variable that stores the current project
let currentProjectID = null;
let currentTodoID = null;
// function that creates a project 
function createProject(name){
    const newProject = {
        name,
        id: crypto.randomUUID(),
        todos: []
    };

    projectsArray.push(newProject);
    saveToLocalStorage();
    return newProject;
};

// function that creates a todo
function createTodo(name, date, desc){
    const newTodo = {
        name,
        date,
        desc,
        id: crypto.randomUUID()
    };

    const project = getCurrentProject();
    project.todos.push(newTodo);
    saveToLocalStorage();
    
    return newTodo;
};

// function that sets the current id
function setCurrentProject(id){
    currentProjectID = id;
};

// function that returns the current project
function getCurrentProject(){
    return projectsArray.find(project => project.id === currentProjectID);
};


function getCurrentTodo(project){
    return project.todos.findIndex(todo => todo.id === currentTodoID);
};

// function that deletes the todo
function deleteTodos(todoIndex){
    let project = getCurrentProject();

    if(todoIndex !== -1){
        project.todos.splice(todoIndex, 1);
        saveToLocalStorage();
        renderTodos();
    };

};


export { createProject, createTodo, projectsArray, setCurrentProject, getCurrentProject, deleteTodos, getCurrentTodo, saveToLocalStorage, loadFromLocalStorage };