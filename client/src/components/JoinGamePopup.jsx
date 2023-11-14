import { useRef } from "react";

function JoinGamePopup({ joinGameRef, handleJoinGame, handleModalClose }) {
    const nameInputRef = useRef();
    const roomInputRef = useRef();

    return (
        <dialog ref={joinGameRef} onClick={handleModalClose} className="rounded-lg">
            <form 
                method="dialog"
                onSubmit={() => handleJoinGame(nameInputRef.current.value, roomInputRef.current.value)}
                className="popup-form"
            >
                <label htmlFor="name" className="text-xl">What's your name?</label>
                <input 
                    type="text"
                    name="name"
                    ref={nameInputRef}
                    required autoFocus
                    className="popup-input" 
                />

                <label htmlFor="room" className="text-xl">Enter Room Code</label>
                <input 
                    type="text"
                    name="room"
                    ref={roomInputRef}
                    required
                    className="popup-input uppercase" 
                />

                <button type="submit" className="popup-btn">Let's go</button>
            </form>
        </dialog>
    );
}

export default JoinGamePopup;