// server.js (Servidor en Node.js con Express y Socket.io)

const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const app = express();

const PORT = process.env.PORT || 3000; // Usar el puerto de Railway o el 3000

app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});