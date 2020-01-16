// Function to connect to the server
// stored in a constant named socket to have access to it
const socket = io();

socket.on("message", (message) => {
    console.log(message);
})

$messageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // const message = document.getElementById('message').value;
    const message = event.target.elements.message.value;
    socket.emit("sendMessage", message, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log("Client says: Message was sent.")
    });
})

document.getElementById("location").addEventListener("click", (event) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit("sendLocation", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => console.log("Location shared!"))
    })

})