import { projectsArray, createProject, createTodo, setCurrentProject, getCurrentProject } from "./programLogic";

function showProject(){
    
    let projectCreator = document.querySelector("#project-creation");

    const projectInputDiv = document.createElement("div");
    projectInputDiv.id = "project-input";

    const projectForm = document.createElement("input");
    projectForm.id = "project-name";

    const addProject = document.createElement("button");
    addProject.id = "add-project";
    addProject.innerText = "Add Project";

    const cancelProject = document.createElement("button");
    cancelProject.id = "cancel-project";
    cancelProject.innerText = "Cancel";

    projectInputDiv.appendChild(projectForm);
    projectCreator.appendChild(projectInputDiv);
    projectInputDiv.appendChild(addProject);
    projectInputDiv.appendChild(cancelProject);

    addProject.addEventListener("click", function(){
        if(projectForm.value === ""){
            alert("Please, enter a name for the project");
            return
        };
        projectAddition(projectForm);
        projectCreator.innerHTML = "";
    });

    cancelProject.addEventListener("click", function(){
        projectCreator.innerHTML = "";
    });

    
};

function projectAddition(projectForm){
    const projectName = document.createElement("button");
    projectName.classList.add("project-name");

    projectName.innerText = projectForm.value;
    document.querySelector("#project-list").appendChild(projectName);

    let newProject = createProject(projectForm.value);
    projectsArray.push(newProject);

    projectName.id = newProject.id;

    projectName.addEventListener("click", function(){
        setCurrentProject(this.id);
        renderCurrentProject();
        renderTodos();
    });

};

function renderCurrentProject(){
    const projectContentDiv = document.querySelector("#project-content");
    projectContentDiv.innerHTML = "";
    const addTodos = document.createElement("button");
    addTodos.id = "add-todos";
    addTodos.innerText = "Add Todo";

    projectContentDiv.appendChild(addTodos);

    addTodos.addEventListener("click", function(){
        todoCreationForm();
    });

};

function todoCreationForm(){
    const project = getCurrentProject();

    const todoFormDiv = document.createElement("div");
    todoFormDiv.id = "todo-form-div";

    const todoTitle = document.createElement("input");
    todoTitle.type = "text";

    const todoDate = document.createElement("input");
    todoDate.type = "date";

    const todoDesc = document.createElement("input");
    todoDesc.type = "text";

    const addTodo = document.createElement("button");
    addTodo.innerText = "Add Todo";

    const cancelTodo = document.createElement("button");
    cancelTodo.innerText = "Cancel";

    let formArray = [todoTitle, todoDate, todoDesc, addTodo, cancelTodo];
    formArray.forEach(element => todoFormDiv.appendChild(element));

    document.querySelector("#project-content").appendChild(todoFormDiv);

    addTodo.addEventListener("click", function(){
        if(todoTitle.value === "" || todoDate.value === "" || todoDesc.value === ""){
            alert("Please fill out the parameters");
            return
        };
        let newTodo = createTodo(todoTitle.value, todoDate.value, todoDesc.value);
        project.todos.push(newTodo);
        console.log(project);
        todoFormDiv.remove();
        renderTodos();
    });

};

function renderTodos(){
    let project = getCurrentProject();
    const projectContainer = document.querySelector("#project-content");
    const todoCardsContainer = document.createElement("div");
    todoCardsContainer.classList.add("todo-container");

    project.todos.forEach((todo) => {
        
        todoCardsContainer.innerHTML = "";

        const todoCardDiv = document.createElement("div");
        todoCardDiv.classList.add("todo-card");

        const todoTitle = document.createElement("h2");
        todoTitle.innerText = todo.name;

        const todoDate = document.createElement("h3");
        todoDate.innerText = todo.date;

        const todoDescription = document.createElement("p");
        todoDescription.innerText = todo.desc;

        let cardArray = [todoTitle, todoDate, todoDescription];
        cardArray.forEach(todo => todoCardDiv.appendChild(todo));
        todoCardsContainer.appendChild(todoCardDiv);
        projectContainer.appendChild(todoCardsContainer);

    });
    
};

export { showProject };