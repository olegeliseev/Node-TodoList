$(document).ready(function() {
    //Display all todos
    $.getJSON("api/todos")
        .then(displayTodos)
        .catch(err => console.log(err));

    //Add todo when Add button is clicked
    $(".add-button").on("click", function(e) {
        e.preventDefault();
        let inputVal = $(".input").val();
        if (inputVal.length !== 0) {
            createTodo();
        }
        return;
    })

    //Delete todo when X button is clicked
    $(".list").on("click", ".delete-button", function() {
        deleteTodo($(this).parent());
    });

    // Toggle cross on todo when li is clicked
    $(".list").on("click", ".list-element", function() {
        updateTodo($(this));
    })
})

//Get all todos from database and append on list
function displayTodos(todos) {
    todos.forEach(todo => {
        appendTodo(todo);
    })
}

function appendTodo(todo) {
    const newTodo = $(`<li class="list-element"><span>${todo.name}</span> <button class="delete-button">X</button></li>`);
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("crossed");
      }
    $(".list").append(newTodo);
}

function createTodo() {
    let inputVal = $(".input").val();
    $.post("/api/todos", { name: inputVal })
        .then(function(newTodo) {
            $(".input").val("");
            appendTodo(newTodo);
        })
}

function deleteTodo(todo) {
    const clickedId = todo.data("id");
    const deleteUrl = `/api/todos/${clickedId}`;
    $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        .then(function() {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        });
}

function updateTodo(todo) {
    const clickedId = todo.data("id");
    const updateUrl = `/api/todos/${clickedId}`;
    let isDone = todo.data("completed");
    $.ajax({
            method: "PUT",
            url: updateUrl,
            data: { completed: !isDone }
        })
        .then(function(updatedTodo) {
            todo.toggleClass("crossed")
            todo.data("completed", !isDone);
        })
        .catch(err => console.log(err));
}