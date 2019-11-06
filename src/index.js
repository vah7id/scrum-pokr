import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const WS = require('websocket').w3cwebsocket;
export const client = new WS('ws://localhost:8000/', 'echo-protocol', null, null, {});

client.onopen = (msg) => {
    console.log('send signal')
};

client.onmessage = (msg) => {
	console.log(JSON.parse(msg.data))
}

client.onclose = () => {
    console.log('lost connection')
}

client.onerror = () => {
    console.log('error in connection')
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
