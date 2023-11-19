import { useEffect, useMemo, useRef, useState } from "react";
import socket from "socket";
import LobbyPlayerList from "components/LobbyPlayerList";
import { locations, spy } from "locations";

function Lobby({ player, roomCode, isHost, setGameStarted, setLocation, isReady, setIsReady, setGameTime }) {
    const [playersInLobby, setPlayersInLobby] = useState([]);
    const gameTimeRef = useRef();

    useEffect(() => {
        socket.emit("joined-lobby", roomCode);

        socket.on("lobby-update", (players) => {
            const otherPlayers = players.filter(pl => pl.username !== player.username);
            setPlayersInLobby(otherPlayers);

            if (isHost)
                handleGameTimeChange();
        });

        socket.on("chosen-spy", () => {
            socket.isSpy = true;
        });

        socket.on("game-started", (locationIndex) => {
            if (socket.isSpy)
                setLocation(spy)
            else
                setLocation(locations[locationIndex]);
            setGameStarted(true);
        });

        socket.on("game-time-updated", (time) => setGameTime(time));
    }, []);
    
    const handlePlayerReady = () => {
        setIsReady(!isReady);
        socket.emit("player-ready", roomCode);
    }

    const handleGameStart = () => {
        const minPlayers = 2;
        if (playersInLobby.length + 1 < minPlayers) {
            alert(`Atleast ${minPlayers} players required!!`);
            return
        }

        if (!isReady || !playersInLobby.every((player) => player.isReady)) {
            alert("All Players not Ready!!");
            return;
        }

        const totalLocations = locations.length;
        const randomLocationIndex = Math.floor(Math.random() * totalLocations);
        socket.emit("start-game", roomCode, randomLocationIndex);
    }

    function handleGameTimeChange() {
        socket.emit("update-game-time", parseInt(gameTimeRef.current.value), roomCode);
    }

    return (
        <main className="w-full grow flex flex-col gap-y-4 px-4 py-8 sm:w-2/3 lg:w-3/6">
            <div className="flex justify-between items-center">
                <p className="py-1 px-3 bg-gray-100 rounded-md border-2 border-gray-500">{roomCode}</p>

                { isHost && <div>
                    <label htmlFor="game-time-input" className="font-semibold uppercase text-gray-800 mr-2">Time</label>
                    <select 
                        id="game-time-input" 
                        onChange={handleGameTimeChange}
                        className="border-2 border-gray-500 rounded-md py-1"
                        ref={gameTimeRef}
                    >
                        <option value="480">8 mins</option>
                        <option value="600" selected>10 mins</option>
                        <option value="900">15 mins</option>
                        <option value="1200">20 mins</option>
                    </select>
                </div>}
            </div>

            <div className="flex justify-between items-center p-2 bg-yellow-100 rounded-md">
                <h2 className="text-lg text-gray-800 font-semibold tracking-wider">
                    { player.username }
                </h2>

                <button 
                    onClick={handlePlayerReady}
                    className={`py-1 px-2 rounded-md text-white ${ isReady ? "bg-green-600" : "bg-red-600" }`}
                >
                    { isReady ? "Ready" : "Not Ready" }
                </button>
            </div>

            { (playersInLobby.length > 0) && <LobbyPlayerList
                playersInLobby={playersInLobby}
            /> }

            { isHost && 
                <button 
                    onClick={handleGameStart} 
                    className="py-2 px-4 text-md tracking-wider font-semibold 
                        bg-green-500 w-fit self-center text-white rounded-md"
                >
                    Start Game
                </button> 
            }
        </main>
    );
}

export default Lobby;