import React from 'react';
import socketIOClient from "socket.io-client";

class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
            messageToSubmit: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const messageToSubmit = this.state.message;
        this.setState({ messageToSubmit })

        const socket = socketIOClient();
        socket.emit("sendMessage", this.state.message, () => {
            this.setState({ message: "", messageToSubmit: "" });
            console.log("Message was sent.")
        });
    }

    handleClick() {
        if (!navigator.geolocation) {
            return alert('Geolocation is not supported by your browser');
        }
        navigator.geolocation.getCurrentPosition(position => {
            const messageToSubmit = "Searching...";
            this.setState({ messageToSubmit })
            const socket = socketIOClient();
            socket.emit("sendLocation", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                this.setState({ messageToSubmit: "" })
                console.log("Location shared!");
            })
        })
    }

    componentDidMount() {
        const socket = socketIOClient();
        socket.on("message", (message) => {
            console.log("Message from the server incoming:", message)
        })
    }

    render() {
        const { messageToSubmit } = this.state;
        return (
            <div className="Message">
                <h1>Cute maths chat</h1>
                <p>Type in your message here:</p>
                <form id="message-form" onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            id="message"
                            placeholder="Your message"
                            type="text"
                            value={this.state.message}
                            onChange={this.handleChange}
                        />
                        <button id="send">Send</button>
                        <button id="location" onClick={this.handleClick}>Share location</button>
                    </label>
                </form>
                {messageToSubmit !== "" &&
                    <p>{messageToSubmit}</p>}
            </div>
        );
    }
}

export default Message;
