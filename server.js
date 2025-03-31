// server.js (Servidor en Node.js con Express y Socket.io)

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir archivos estáticos (como el HTML y CSS)
app.use(express.static(__dirname + '/public'));

// Manejar conexiones de usuarios
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('mensaje', (data) => {
        io.emit('mensaje', data); // Enviar el mensaje a todos los usuarios
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
