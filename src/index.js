import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
export const serverConnection = new WebSocket('ws://127.0.0.1:3434');

export let peerConnection = null;

window['RTCPeerConnection'] = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

serverConnection.onopen = function () {
  serverConnection.send('message to client');
};

// Log errors
serverConnection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
};

serverConnection.onmessage = (message) => {
    if(!peerConnection) {
    	new RTCPeerConnection(peerConnectionConfig);
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
