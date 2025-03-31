const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos (si tienes un directorio 'public' con tu HTML)
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Cuando el cliente envía un mensaje, retransmitirlo a todos los demás clientes
    socket.on('mensaje', (msg) => {
        console.log('Mensaje recibido:', msg);
        io.emit('mensaje', msg); // Emitir a todos los clientes
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});