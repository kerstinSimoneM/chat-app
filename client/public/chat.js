// Function to connect to the server
// stored in a constant named socket to have access to it
const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("#message");
const $messageFormButton = $messageForm.querySelector("#send");
const $sendLocationButton = document.getElementById("location");
const $locationText = document.getElementById("searching");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message").innerHTML;

socket.on("message", (message) => {
    console.log(message);
})

$messageForm.addEventListener("submit", (event) => {
    event.preventDefault()

    $messageFormButton.setAttribute("disabled", "disabled");

    // const message = document.getElementById('message').value;
    const message = event.target.elements.message.value;

    socket.emit("sendMessage", message,
        // acknowledgement callback
        (error) => {

            $messageFormButton.removeAttribute("disabled");
            document.getElementById('message').value = "";

            if (error) {
                return console.log(error)
            }
            console.log("Message was sent.")
        });
})

$sendLocationButton.addEventListener("click", () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $sendLocationButton.setAttribute("disabled", "disabled");
    document.getElementById("searching").textContent = "Searching...";

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit("sendLocation", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },
            // acknowledgement callback
            () => {
                $sendLocationButton.removeAttribute("disabled");
                document.getElementById("searching").textContent = "";
                console.log("Location shared!", document.getElementById("searching").textContent)
            })
    })

})