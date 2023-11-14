import HostGamePopup from "components/HostGamePopup";
import JoinGamePopup from "components/JoinGamePopup";
import { useRef } from "react";
import socket from "socket";

function Home({ isConnected, setPlayer, setRoomCode, setIsHost }) {
    const hostGameRef = useRef();
    const joinGameRef = useRef();

    const handleCreateGame = (name) => {
        if (!isConnected) return;
        setPlayer({ id: socket.id, username: name });
        socket.emit("host-game", name, (code) => {
            setRoomCode(code);
            setIsHost(true);
        });
    }

    const handleJoinGame = (name, room) => {
        if (!isConnected) return;
        
        socket.emit("join-room", room, name, (success) => {
            if (success) {
                setPlayer({ id: socket.id, username: name });
                setRoomCode(room); 
            } else {
                alert("Room doesnt exist");
            }
        });
    }

    const handleModalClose = (e) => {
        if (e.target.localName === "dialog")
            e.target.close();
    }

    return (
        <main className="grid place-content-center gap-y-12 grow">
            <h1 className="text-center text-6xl font-bold">Spyfall</h1>

            <div className="grid gap-y-4">
                <button 
                    onClick={() => hostGameRef.current.showModal()}
                    className="p-2 border-4 border-black rounded-xl 
                        cursor-pointer text-xl font-semibold transition-colors 
                        duration-150 hover:bg-black hover:text-white"
                >
                    Host New Game
                </button>

                <button 
                    onClick={() => joinGameRef.current.showModal()}
                    className="p-2 border-4 border-black rounded-xl 
                        cursor-pointer text-xl font-semibold  transition-colors 
                        duration-150 hover:bg-black hover:text-white"
                >
                    Join Game
                </button>
            </div>

            <HostGamePopup
                hostGameRef={hostGameRef}
                handleCreateGame={handleCreateGame}
                handleModalClose={handleModalClose}
            />
            
            <JoinGamePopup
                joinGameRef={joinGameRef}
                handleJoinGame={handleJoinGame}
                handleModalClose={handleModalClose}
            />
        </main>
    )
}

export default Home;