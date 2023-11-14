const generateRandomCode = require("./utils/randomCodeGenerator");
const io = require("socket.io")(3001, {
    cors: {
        origin: [
            "http://mdfarhan20.github.io/spyfall",
            "http://localhost:5173", 
            "http://127.0.0.1:5173"
        ]
    }
});

io.on("connection", socket => {
    socket.on("host-game", (name, callback) => {
        const roomCode = generateRandomCode();
        socket.join(roomCode);
        socket.username = name;
        socket.isHost = true;
        callback(roomCode);
    });

    const updateLobby = async (room) => {
        let clients = await io.in(room).fetchSockets();
        clients = clients.map(cl => {return {id: cl.id, username: cl.username, isReady: cl.isReady}});
        io.to(room).emit("lobby-update", clients);
    }

    socket.on("join-room", (room, name, callback) => {
        try {
            const clientsInRoom = io.sockets.adapter.rooms.get(room);
            if (clientsInRoom) {
                socket.join(room);
                socket.username = name;
                socket.isReady = false;
                socket.isHost = false;
                callback(true);
            } else {
                callback(false);
            }
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("joined-lobby", (room) => updateLobby(room));

    socket.on("player-ready", (room) => {
        socket.isReady = !socket.isReady;
        updateLobby(room);
    });

    const getRandomValue = (limit) => {
        return Math.floor(Math.random() * limit);
    }

    socket.on("start-game", async (room, locationIndex) => {
        let clients = await io.in(room).fetchSockets();
        const randomIndex = getRandomValue(clients.length);
        io.to(clients[randomIndex].id).emit("chosen-spy");
        io.to(room).emit("game-started", locationIndex);
    });

    socket.on("update-game-time", (gameTime, room) => {
        io.to(room).emit("game-time-updated", gameTime);
    });

    const clearRoom = async (room) => {
        io.to(room).emit("host-exited");
        let clients = await io.in(room).fetchSockets();
        for (let client of clients) {
            client.leave(room);
        }
    }

    socket.on("disconnecting", () => {
        const rooms = [...socket.rooms];
        rooms.forEach(room => {
            if (socket.isHost)
                clearRoom(room);
            socket.leave(room);
            updateLobby(room);
        });

    });
});
