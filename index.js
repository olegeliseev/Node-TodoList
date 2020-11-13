const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

//Homepage
app.get("/", function(req, res) {
    res.sendFile("index.html");
});

//Api Todos


app.listen(3000, () => console.log("Server is running"));