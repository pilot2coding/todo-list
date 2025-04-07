import { projectsArray, createProject, createTodo, setCurrentProject, getCurrentProject, deleteTodos, updateTodos, removeProject, urgentTodoArray, returnUrgentTodos, pastTodoArray } from "./programLogic";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

let isEditing = false;

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
        if(isEditing) return;
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

    const deleteProject = document.createElement("button");
    deleteProject.id = "delete-todos";
    deleteProject.innerText = "Delete Project";
    projectContentDiv.appendChild(addTodos);
    projectContentDiv.appendChild(deleteProject);
    
    addTodos.addEventListener("click", function(){
        if(document.querySelector("#todo-form-div")){
            return;
        };

        if(isEditing) return;

        todoCreationForm();
    });

    deleteProject.addEventListener("click", function(){
        const projectID = getCurrentProject() ? getCurrentProject().id : null;
        removeProject();
        if(projectID){
            let removedProjectButton = document.querySelector(`#project-list button[id="${projectID}"]`);
            document.querySelector("#project-content").innerHTML = "";
            if(removedProjectButton){
                removedProjectButton.remove();
            };
        };
    });

};

function todoCreationForm(){

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
    if(!project){
        return;
    };
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
        const formattedDate = format(new Date(todo.date), "EEEE d, MMMM yyyy", { locale: enUS});
        todoDate.innerText = formattedDate;

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
            if(isEditing) return;
            isEditing = true;
            let todoID = todoCardDiv.getAttribute("id");
            editTodos(todoID);
            

        });

        let cardArray = [todoTitle, todoDate, todoDescription, deleteTodo, editTodo];
        cardArray.forEach(todo => todoCardDiv.appendChild(todo));
        todoCardsContainer.appendChild(todoCardDiv);

    });
 
    
};

function renderStoredProjects(){
    projectsArray.forEach(project => {
        //project list div
        const projectList = document.querySelector("#project-list");
        
        const projectNameButton = document.createElement("button");
        projectNameButton.textContent = project.name;
        projectNameButton.classList.add("project-name");
        projectNameButton.id = project.id;

        projectList.appendChild(projectNameButton);

        projectNameButton.addEventListener("click", function(){
            setCurrentProject(this.id);
            renderCurrentProject();
            renderTodos();
        });
        
    });
};

function renderUrgentTodos(){
   
    const projectContainer = document.querySelector("#project-content");
    let todoCardsContainer = document.querySelector(".todo-container");
    if(todoCardsContainer){
        todoCardsContainer.innerHTML = "";
        const addTodosElement = document.querySelector("#add-todos");
        if(addTodosElement){
            addTodosElement.remove();
        };
        const deleteTodosElement = document.querySelector("#delete-todos");
        if(deleteTodosElement){
            deleteTodosElement.remove();
        };
    };
    
    
    if(!todoCardsContainer){
        todoCardsContainer = document.createElement("div");
        todoCardsContainer.classList.add("todo-container");
        projectContainer.appendChild(todoCardsContainer);
    };

    urgentTodoArray.forEach((todo) => {
        

        const todoCardDiv = document.createElement("div");
        todoCardDiv.classList.add("todo-card");
        todoCardDiv.id = todo.id;

        const todoTitle = document.createElement("h2");
        todoTitle.innerText = todo.name;

        const todoDate = document.createElement("h3");
        const formattedDate = format(new Date(todo.date), "EEEE d, MMMM yyyy", { locale: enUS});
        todoDate.innerText = formattedDate;

        const todoDescription = document.createElement("p");
        todoDescription.innerText = todo.desc;

        let cardArray = [todoTitle, todoDate, todoDescription];
        cardArray.forEach(todo => todoCardDiv.appendChild(todo));
        todoCardsContainer.appendChild(todoCardDiv);

    });
};

function renderPastTodos(){
   
    const projectContainer = document.querySelector("#project-content");
    let todoCardsContainer = document.querySelector(".todo-container");
    if(todoCardsContainer){
        todoCardsContainer.innerHTML = "";
        const addTodosElement = document.querySelector("#add-todos");
        if(addTodosElement){
            addTodosElement.remove();
        };
        const deleteTodosElement = document.querySelector("#delete-todos");
        if(deleteTodosElement){
            deleteTodosElement.remove();
        };
    };
    
    
    if(!todoCardsContainer){
        todoCardsContainer = document.createElement("div");
        todoCardsContainer.classList.add("todo-container");
        projectContainer.appendChild(todoCardsContainer);
    };

    pastTodoArray.forEach((todo) => {
        

        const todoCardDiv = document.createElement("div");
        todoCardDiv.classList.add("todo-card");
        todoCardDiv.id = todo.id;

        const todoTitle = document.createElement("h2");
        todoTitle.innerText = todo.name;

        const todoDate = document.createElement("h3");
        const formattedDate = format(new Date(todo.date), "EEEE d, MMMM yyyy", { locale: enUS});
        todoDate.innerText = formattedDate;

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
            if(isEditing) return;
            isEditing = true;
            let todoID = todoCardDiv.getAttribute("id");
            editTodos(todoID);
            

        });

        let cardArray = [todoTitle, todoDate, todoDescription, deleteTodo, editTodo];
        cardArray.forEach(todo => todoCardDiv.appendChild(todo));
        todoCardsContainer.appendChild(todoCardDiv);

    });
};

document.querySelector("#urgent").addEventListener("click", function(){
    returnUrgentTodos();
    renderUrgentTodos()
    
});

function editTodos(todoID){
    let project = getCurrentProject();
    let currentTodo = project.todos.find(todo => todo.id === todoID);
    const projectCard = document.querySelector(`.todo-card[id="${todoID}"]`);


    const title = projectCard.querySelector("h2");
    const oldTitle = title.innerText;
    const date = projectCard.querySelector("h3");
    const oldDate = date.innerText;
    const desc = projectCard.querySelector("p");
    const oldDesc = desc.innerText;
    const deletes  = projectCard.querySelector(".delete-button");
    const edit = projectCard.querySelector(".edit-button");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = title.innerText;

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = date.innerText;

    const descInput = document.createElement("input");
    descInput.type = "text";
    descInput.value = desc.innerText;

    const acceptButton = document.createElement("button");
    acceptButton.innerText = "Accept";

    acceptButton.addEventListener("click", function(){
        isEditing = false;
        updateTodos(todoID, titleInput.value, dateInput.value, descInput.value);
        renderTodos();
    });
    
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";

    cancelButton.addEventListener("click", function(){
        isEditing = false;
        updateTodos(todoID, oldTitle, oldDate, oldDesc);
        renderTodos();
    });

    let editionArray = [titleInput, dateInput, descInput, acceptButton, cancelButton];
    let textArray = [title, date, desc, deletes, edit];

    textArray.forEach(item =>{
        item.remove();
    });

    editionArray.forEach(item => {
        projectCard.appendChild(item);
    });
    console.log(currentTodo);
}




export { showProject, renderTodos, renderStoredProjects, renderUrgentTodos };