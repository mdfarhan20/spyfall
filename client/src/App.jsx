import { useEffect, useState } from "react";
import socket from "./socket";
import Navbar from "components/Navbar";
import Home from "components/Home";
import Lobby from "components/Lobby";
import Game from "components/Game";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomCode, setRoomCode] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [location, setLocation] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [gameTime, setGameTime] = useState(600);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("disconnect");
    };
  }, []);


  return (
    <>
        <Navbar />

        { !isConnected && <p className="grow grid place-content-center">Connecting to server...</p> }

        { isConnected && !roomCode && 
          <Home 
            isConnected={isConnected}
            setPlayer={setPlayer}
            setRoomCode={setRoomCode}
            setIsHost={setIsHost}
          /> 
        }

        { roomCode && !gameStarted && <Lobby 
          player={player}
          roomCode={roomCode}
          isHost={isHost} 
          setGameStarted={setGameStarted}
          setLocation={setLocation}
          isReady={isReady}
          setIsReady={setIsReady}
          setGameTime={setGameTime}
        /> }

        {
          gameStarted && <Game 
            roomCode={roomCode}
            setRoomCode={setRoomCode}
            location={location}
            setGameStarted={setGameStarted}
            gameTime={gameTime}
            isHost={isHost}
          />
        }
    </>
  );
}

export default App
