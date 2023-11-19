import { useEffect, useRef, useState } from "react";
import LocationsList from "components/LocationsList";
import GameEndPopup from "components/GameEndPopup";
import GameCard from "components/GameCard";
import socket from "socket";

function Game({ roomCode, setRoomCode, location, setGameStarted, gameTime, isHost }) {
    const [timerValue, setTimerValue] = useState(gameTime);

    const gameEndPopup = useRef();

    useEffect(() => {
        const timer = setInterval(() => {
            if (timerValue <= 0) {
                clearInterval(timer);
                gameEnd();
                return;
            }
            setTimerValue(prev => prev - 1);
        }, 1000);

        socket.on("host-exited", () => {
            setRoomCode(null);
            setGameStarted(false);
            alert("Host disconnected!!");
        });

        socket.on("game-ended", () => {
            gameEndPopup.current.showModal();
        });

        return () => {
            clearInterval(timer);
        };
    });
    
    function formatCountdown(duration) {
        let minutes = parseInt(duration / 60).toString();
        let seconds = parseInt(duration % 60).toString();

        if (seconds.length === 1)
            seconds = "0" + seconds;
        
        return (`${minutes}:${seconds}`);
    }

    function gameEnd() {
        socket.emit("end-game", roomCode);
    }

    function handleLobbyReturn() {
        gameEndPopup.current.close();
        setGameStarted(false);
    }
 
    return (
        <main className="grow grid gap-y-4 px-4 py-8 sm:w-2/3 lg:w-full ">
            <div className="flex justify-between items-center">
                <p className="py-1 px-3 bg-gray-100 rounded-md border-2 border-gray-500">{roomCode}</p>
                <p className="py-1 px-3 bg-gray-100 rounded-md border-2 border-gray-500">{ formatCountdown(timerValue) }</p>
            </div>


            <div className="grid gap-8 lg:grid-cols-3 lg:grid-rows-1">
                <GameCard location={location} />
                <LocationsList />
            </div>

            <GameEndPopup
                gameEndPopup={gameEndPopup}
                handleLobbyReturn={handleLobbyReturn}
            />

            { isHost && <button
                    onClick={gameEnd}
                    className="py-2 px-4 text-md tracking-wider font-semibold 
                        bg-red-500 w-fit self-center text-white rounded-md place-self-center"
                >End Round</button> 
            }
        </main>
    );
}

export default Game;