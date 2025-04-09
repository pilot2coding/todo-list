import {renderTodos} from "./userInterface"
// global array that stores the user projects
const projectsArray = [];

// global array that stores urgent tasks
const urgentTodoArray = [];

// global array that stores past tasks
const pastTodoArray = [];

// stores the projectsArray on the localStorage
function saveToLocalStorage(){
    localStorage.setItem("projects", JSON.stringify(projectsArray));
    localStorage.setItem("pastTodos", JSON.stringify(pastTodoArray));
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
    const storedPastTodos = localStorage.getItem("pastTodos");
    if(storedPastTodos){
        const parsePastTodos = JSON.parse(storedPastTodos);
        pastTodoArray.length = 0;
        parsePastTodos.forEach(todo => pastTodoArray.push(todo));
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
function createTodo(name, date, desc, status){
    const newTodo = {
        name,
        date,
        desc,
        status: false,
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

// function that deletes the past todos
function deletePastTodos(todoIndex){
    if(todoIndex !== -1){
        pastTodoArray.splice(todoIndex, 1);
        saveToLocalStorage();
        renderTodos();
    };
};

// function that updates the todo without changing the unique ID
function updateTodos(todoID, newTitle, newDate, newDesc){
    let project = getCurrentProject();
    let projectTodos = project.todos;
    const currentTodo = projectTodos.find(todo => todo.id === todoID);
    currentTodo.name = newTitle;
    currentTodo.date = newDate;
    currentTodo.desc = newDesc;
    saveToLocalStorage();
    return currentTodo;
};

// function that removes the project from the array
function removeProject(){
    let project = getCurrentProject();
    
    if(!project){
        return;
    };

    let projectIndex = projectsArray.findIndex(proj => proj.id === project.id);
    if(projectIndex !== -1){
        projectsArray.splice(projectIndex, 1);
        saveToLocalStorage();
        currentProjectID = null;
    };
};

function returnUrgentTodos(){
    let today = new Date();
    
    
    // runs each project
    projectsArray.forEach(project => {
        // runs each todo inside the project
        project.todos.forEach(todo => {
            const todoDateObj = new Date(todo.date);
            // converts the difference to miliseconds
            const timeDiff = todoDateObj.getTime() - today.getTime();
            // converts difference to days
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            
            if((daysDiff <= 7 && daysDiff >= 0)){
                if(!urgentTodoArray.some(existing => existing.id === todo.id)){
                    urgentTodoArray.push(todo);
                };
            };
        });
    });
};

// function that stores past todos and deletes them from their original array
function returnDeletePastTodos(){
    let today = new Date();

    projectsArray.forEach(project => {
        for(let i = project.todos.length - 1; i >= 0; i--){
            let todo = project.todos[i];
            let todoDateObj = new Date(todo.date);
            let timeDiff = todoDateObj.getTime() - today.getTime();
            let daysDiff = timeDiff / (1000 * 3600 * 24);

            if(daysDiff < 0){
                if(!pastTodoArray.some(existing => existing.id === todo.id)){
                    pastTodoArray.push(todo);
                };
                project.todos.splice(i, 1);
            };
        };
    });
    saveToLocalStorage();
}
export { createProject, createTodo, projectsArray, setCurrentProject, getCurrentProject, deleteTodos, getCurrentTodo, saveToLocalStorage, loadFromLocalStorage, updateTodos, removeProject, returnUrgentTodos, urgentTodoArray, returnDeletePastTodos, pastTodoArray, deletePastTodos };