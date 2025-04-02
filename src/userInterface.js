import { projectsArray, createProject, createTodo, setCurrentProject, getCurrentProject, deleteTodos, loadFromLocalStorage } from "./programLogic";

function showProject(){
    loadFromLocalStorage();
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
        if(document.querySelector("#todo-form-div")){
            return;
        };

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
    addTodo.innerText = "Add";

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

        createTodo(todoTitle.value, todoDate.value, todoDesc.value);
        todoFormDiv.remove();
        renderTodos();
    });

    cancelTodo.addEventListener("click", function(){
        todoFormDiv.remove();
    });

};

function renderTodos(){
    let project = getCurrentProject();
    const projectContainer = document.querySelector("#project-content");
    let todoCardsContainer = document.querySelector(".todo-container");
    
    if(!todoCardsContainer){
        todoCardsContainer = document.createElement("div");
        todoCardsContainer.classList.add("todo-container");
        projectContainer.appendChild(todoCardsContainer);
    };
    
    todoCardsContainer.innerHTML = "";

    project.todos.forEach((todo) => {

        const todoCardDiv = document.createElement("div");
        todoCardDiv.classList.add("todo-card");
        todoCardDiv.id = todo.id;

        const todoTitle = document.createElement("h2");
        todoTitle.innerText = todo.name;

        const todoDate = document.createElement("h3");
        todoDate.innerText = todo.date;

        const todoDescription = document.createElement("p");
        todoDescription.innerText = todo.desc;

        const deleteTodo = document.createElement("button");
        deleteTodo.classList.add("delete-button");
        deleteTodo.innerText = "Delete Todo";

        deleteTodo.addEventListener("click", function(){
            let todoID = todoCardDiv.getAttribute("id");
            deleteTodos(todoID);
    
        });

        const editTodo = document.createElement("button");
        editTodo.classList.add('edit-button');
        editTodo.innerText = "Edit Todo";

        editTodo.addEventListener("click", function(){
            let todoID = todoCardDiv.getAttribute("id");
            todoCreationForm();

        });

        let cardArray = [todoTitle, todoDate, todoDescription, deleteTodo, editTodo];
        cardArray.forEach(todo => todoCardDiv.appendChild(todo));
        todoCardsContainer.appendChild(todoCardDiv);

    });
 
    
};




export { showProject, renderTodos };