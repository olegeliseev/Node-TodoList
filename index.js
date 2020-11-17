const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// ============================ MONGO CONNECTION AND SCHEMA ============================

mongoose.set("debug", true);
mongoose.Promise = Promise; //Позволяет использовать промисы с методами монго
mongoose.connect("mongodb://localhost:27017/node-todo", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN")
    })
    .catch(err => {
        console.log(err)
    })

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Это поле не может быть пустым"
    },
    completed: {
        type: Boolean,
        default: false
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model("Todo", todoSchema);

// ============================ HOMEPAGE ============================

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

// ============================ TODOS API ============================

//All todos
app.route("/api/todos")

//Get all todos
.get(function(req, res) {
    Todo.find()
        .then(function(todos) {
            res.json(todos)
        })
})

//Create todo
.post(function(req, res) {
    Todo.create(req.body)
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(`Something went wrong: ${err}`);
        })
})

//Specific todo
app.route("/api/todos/:todoId")

//Get specific todo
.get(function(req, res) {
    Todo.findById({ _id: req.params.todoId })
        .then(function(todo) {
            res.json(todo)
        })
        .catch(function(err) {
            res.send(err)
        })
})

//Update specific todo
.put(function(req, res) {
    Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
        .then(function(todo) {
            res.json(todo);
        })
        .catch(function(err) {
            res.send(`Something went wrong: ${err}`);
        })
})

//Delete specific todo
.delete(function(req, res) {
    Todo.deleteOne({ _id: req.params.todoId })
        .then(function() {
            res.send("Todo deleted successfully");
        })
        .catch(function(err) {
            res.send(`Something went wrong: ${err}`);
        })
})


app.listen(3000, () => console.log("SERVER RUNNING"));