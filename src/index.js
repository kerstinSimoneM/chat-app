// Create an Express web server

const path = require("path");
const http = require("http");
const express = require("express");
// load in socket.io
const socketio = require("socket.io");
const Filter = require('bad-words');

const app = express();
// socket.io have to be called by the ray http server
// that's why we use createServer
const server = http.createServer(app);
// create an instance to use socket.io
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public")

// give access to the html file in the public folder
app.use(express.static(publicDirectoryPath))

// print a message when a client connects (event is called connection)
// connection is an build-in event
io.on("connection", (socket) => {
    // socket is an object that contains information about the current connection, one user! 
    console.log("New WebSocket connection");

    socket.emit("message", "Welcome, cutie!");

    socket.broadcast.emit("message", "A new user has joined");

    socket.on("sendMessage", (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback("Profanity is not allowed!")
        }
         
        io.emit("message", message);
        callback();
    })

    socket.on("sendLocation", (location, callback) => {
        const { latitude, longitude } = location;
        io.emit("message", `https://www.google.com/maps?q=${latitude},${longitude}`);
        callback();

    })

    // disconnect is an build-in event
    socket.on("disconnect", () => {
        io.emit("message", "User has left.")
    });

})



server.listen(port, () => {
    console.log("Server is up on port 3000.")
})
