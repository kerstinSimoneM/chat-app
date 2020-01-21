import React from 'react';
import logo from './knot.jpg';
import './App.css';
import Message from "./components/Message/Message"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Message />
      </header>
    </div>
  );
}

export default App;
