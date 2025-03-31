const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Permite cualquier origen (puedes cambiarlo a un dominio específico)
    }
});

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado");

    socket.on("mensaje", (msg) => {
        console.log("Mensaje recibido: ", msg);
        io.emit("mensaje", msg); // Reenvía el mensaje a todos
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
