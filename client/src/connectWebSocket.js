import { io } from 'socket.io-client';
import { host } from './store/reducer/api';

// Create a persistent socket variable outside of the functions
let socket = null;

// Function to connect to the Socket.IO server
export const connectWebSocket = () => {
    if (!socket) {
        // Connect to the server using Socket.IO
        socket = io(host);

        // Handle connection open (Socket.IO uses 'connect')
        socket.on('connect', () => {
            console.log('Socket.IO connection opened.');
        });

        // Handle disconnection (Socket.IO uses 'disconnect')
        socket.on('disconnect', () => {
            console.log('Socket.IO connection closed.');
            socket = null; // Reset socket on close
        });

        // Handle errors
        socket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
        });

        // Handle incoming messages (custom event)
        socket.on('message', (data) => {
            console.log('Message from server:', data);
            // Handle incoming messages if necessary
        });
    }

    return socket;
};

// Function to check if the WebSocket (Socket.IO) is connected
export const isWebSocketConnected = () => {
    return socket && socket.connected; // Socket.IO uses `connected` property
};

// Optional: Function to send a message through the WebSocket (Socket.IO)
export const sendWebSocketMessage = (message) => {
    if (isWebSocketConnected()) {
        socket.emit('message', message); // Use `emit` to send messages in Socket.IO
    } else {
        console.log('Socket.IO is not connected.');
    }
};
