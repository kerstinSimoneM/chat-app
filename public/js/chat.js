// Function to connect to the server
// stored in a constant named socket to have access to it
const socket = io();

// //-------------------------------------------------------------------------------------
// // send and reveive events

// // receive an event that the server is sending
// // on accept the name of the event and a function to run when the event occurs
// socket.on("countUpdated", (counter) => {
//     console.log("The count has been updated:", counter);
// })

// document.querySelector("#increment").addEventListener("click", () => {
//     console.log("Clicked!");
//     socket.emit("increment");
// })
// //-------------------------------------------------------------------------------------

socket.on("message", (message) => {
    console.log(message);
})

document.querySelector("#message-form").addEventListener("submit", (event) => {
    event.preventDefault()
    // const message = document.getElementById('message').value;
    const message = event.target.elements.message.value;
    socket.emit("sendMessage", message);
})