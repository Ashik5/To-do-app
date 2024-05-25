// Get references to DOM elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Add event listener to the "Add Todo" button
addTodoBtn.addEventListener("click", addTodo);
//calling the addTodo function when the enter key is pressed
todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

//creating all selecet checkbox
const selectAll = document.createElement("input");
selectAll.type = "checkbox";
selectAll.id = "selectAll";
const label = document.createElement('label');
label.htmlFor = "selectAll";
label.textContent = "Select All";

selectAll.addEventListener("change", function () {
    const checkboxes = todoList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
        //selecting the span element of the checkbox
        const span = checkbox.parentElement.querySelector("span");
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
    });
});
const deleteSelected = document.createElement("button");
deleteSelected.textContent = "Delete Selected";
deleteSelected.classList.add("delete-button");
deleteSelected.addEventListener("click", function () {
    const checkboxes = todoList.querySelectorAll("input[type='checkbox']:checked");
    checkboxes.forEach(checkbox => {
        checkbox.parentElement.remove();
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(t => t !== checkbox.parentElement.querySelector("span").textContent);
        localStorage.setItem('todos', JSON.stringify(todos));
    });
    selectAll.checked = false;
});
//creating the filter div
const filter = document.createElement("div");
const selectOption = document.createElement("div");
selectOption.appendChild(selectAll);
selectOption.appendChild(label);
filter.classList.add("filter");
filter.appendChild(selectOption);
filter.appendChild(deleteSelected);
todoList.parentElement.insertBefore(filter, todoList);



//cheking if all checkboxes are checked
function checkAll() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:not([id='selectAll'])");
    if (Array.from(checkboxes).every(checkbox => checkbox.checked)) {
        selectAll.checked = true;
    } else {
        selectAll.checked = false;
    }
}

// loading the localstorage data
const todos = JSON.parse(localStorage.getItem('todos')) || [];
todos.forEach(todo => {
    showTodos(todo);
});
//
// showing to do function
function showTodos(todoText) {
    const li = document.createElement("li");

        // Create a div to hold the edit and delete buttons
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");

        // Create a span element to display the todo text
        const span = document.createElement("span");
        span.textContent = todoText;

        // Create an Edit button
        const editButton = document.createElement("button");
        editButton.classList.add("link-button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", editTodo);
        buttonsDiv.appendChild(editButton);
        // Create a Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("link-button");
        deleteButton.classList.add("deleteBtn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteTodo);
        buttonsDiv.appendChild(deleteButton);
        // Clear the input field
        todoInput.value = "";
        //creating the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                this.parentElement.querySelector("span").style.textDecoration = "line-through";
                checkAll();
            } else {
                selectAll.checked = this.checked;
                this.parentElement.querySelector("span").style.textDecoration = "none";
            }
        });
        selectAll.checked = false;
        // Append the elements to the list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(buttonsDiv);
        todoList.appendChild(li);
}
// Function to add a new todo item
function addTodo() {
    // Get the trimmed value from the todo input field
    const todoText = todoInput.value.trim();
    // Check if the input is not empty
    if (todoText !== "") {
        showTodos(todoText);
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Function to edit a todo item
function editTodo() {
    const li = this.parentElement.parentElement;
    const editinput = document.createElement("input");
    editinput.type = "text";
    editinput.classList.add("edit-input");
    li.replaceChild(editinput, li.querySelector("span"));
    editinput.focus();
    editinput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const newText = editinput.value.trim();
            // Check if the prompt was not cancelled
            if (newText !== null) {
                // Create a new span element with the updated text
                const span = document.createElement("span");
                span.textContent = newText;
                li.replaceChild(span, li.querySelector("input[type='text']"));
                const todoItems = Array.from(todoList.querySelectorAll("span")).map(span => span.textContent.trim());
                localStorage.setItem('todos', JSON.stringify(todoItems));
            }
        }
    });
}

// Function to delete a todo item
function deleteTodo() {
    // Remove the parent list item of the delete button
    this.parentElement.parentElement.remove();
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t !== this.parentElement.parentElement.querySelector("span").textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
    checkAll();
}
//save the task using localstorage

