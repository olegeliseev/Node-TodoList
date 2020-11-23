$(document).ready(function() {
    //Получить все элементы списка
    $.getJSON("api/todos")
        .then(displayTodos)
        .catch(err => console.log(err));

    //Добавить элемент при нажатии на кнопку Add
    $(".add-button").on("click", function(e) {
        e.preventDefault();
        let inputVal = $(".input").val();
        if (inputVal.length !== 0) {
            createTodo();
        }
        return;
    })

    //Удалить элемент при нажатии на кнопку X
    $(".list").on("click", ".delete-button", function() {
        deleteTodo($(this).parent());
    });

    //Переключать класс с зачеркиванием при нажатии на сам элемент
    $(".list").on("click", ".list-element", function() {
        updateTodo($(this));
    })

    // Отображение даты и времени
    createDate();

    setInterval(function() {
        updateTime();
    }, 1000);
});

//Get all todos from database and append on list
function displayTodos(todos) {
    todos.forEach(todo => {
        appendTodo(todo);
    })
}

function appendTodo(todo) {
    const newTodo = 
    $(`<li class="list-element">
            <span class="list-content">
                ${todo.name}
            </span>
            <button class="delete-button">X</button>
        </li>`);
    //Присвоение объекта к элементу DOM-дерева
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if (todo.completed) {
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
            todo.fadeOut();
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

//Отображение даты и времени
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

function createDate() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();
    const currentTime = currentDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: "numeric", hour12: true });
    $(".date-day").text(currentDay);
    $(".date-month_year").text(`${currentMonth} ${currentYear}`);
    $(".date-time").text(currentTime);
}

function updateTime() {
    createDate();
}