// Create an Express web server

const path = require("path");
const http = require("http");
const express = require("express");
// load in socket.io
const socketio = require("socket.io");

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

// let count = 0;
// print a message when a client connects (event is called connection)
// connection is an build-in event
io.on("connection", (socket) => {
    // socket is an object that contains information about the current connection, one user! 
    console.log("New WebSocket connection");

    socket.emit("message", "Welcome, cutie!");

    socket.on("sendMessage", (message) => {
        io.emit("message", message);
    })

    // //-----------------------------------------------------------------------------------
    // // send an event from the server to the client with a custom event "countUpdated"
    // // it will be emitted to just a single connection
    // socket.emit("countUpdated", count);

    // socket.on("increment", () => {
    //     count++
    //     // it will be emitted to just a single connection
    //     // socket.emit("countUpdated", count);
    //     // new tab on localhost:3000 = new User
    //     // here we want to emit the message to all the users connected
    //     io.emit("countUpdated", count);
    // })
    // //-----------------------------------------------------------------------------------
})



server.listen(port, () => {
    console.log("Server is up on port 3000.")
})
