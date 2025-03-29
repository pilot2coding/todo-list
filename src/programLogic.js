// global array that stores the user projects
const projectsArray = [];

// global variable that stores the current project
let currentProjectID = null;

// function that creates a project 
function createProject(name){
    return {
        name,
        id: crypto.randomUUID(),
        todos: []
    };
};

// function that creates a todo
function createTodo(name, date, desc){
    return {
        name,
        date,
        desc,
        id: crypto.randomUUID()
    };
};

// function that sets the current id
function setCurrentProject(id){
    currentProjectID = id;
};

// function that returns the current project
function getCurrentProject(){
    return projectsArray.find(project => project.id === currentProjectID);
};



export { createProject, createTodo, projectsArray, setCurrentProject, getCurrentProject };