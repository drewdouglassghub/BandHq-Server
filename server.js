const express = require('express');
const mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/band_hq');
mongoose.connection.once("open", () => {
    console.log("Connected to DB");
}).on("error", (error) => {
    console.log("Failed to connect " + error);
})

var server = app.listen(8081, "192.168.4.32", () => {
    console.log("Server is running!");
})

var usersRouter = require('./routes/usersRouter.js');
var bandsRouter = require('./routes/bandsRouter.js');

app.use('/users', usersRouter);
app.use('/bands', bandsRouter);