import React from 'react';
import socketIOClient from "socket.io-client";

class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            "message": ""
        }
    }

    componentDidMount() {
        const socket = socketIOClient();
        socket.on("message", (message) => {
            this.setState({ message }, console.log(message))
        })
    }

    render() {
        const { message } = this.state;
        return (
            <div className="Message">
                <h1>Cute maths chat</h1>
                <p>Type in your message here:</p>
                <form id="message-form">
                    <label>
                        <input id="message" placeholder="Your message" />
                        <button id="send">Send</button>
                        <button id="location">Share location</button>
                    </label>
                </form>
                {message !== "" &&
                    <p>{message}</p>}
            </div>
        );
    }
}

export default Message;
