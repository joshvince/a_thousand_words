import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import socket from './socket';

// Pass in the socket we just imported and send it down to the app component. (This is where redux will come in)
ReactDOM.render(<App socket={socket}/>, document.getElementById('root'));
