import { useRef } from "react";

function HostGamePopup({ hostGameRef, handleCreateGame, handleModalClose }) {
    const inputRef = useRef();

    return (
        <dialog 
            ref={hostGameRef} 
            onClick={handleModalClose}
            className="rounded-lg"
        >
            <form 
                method="dialog"
                onSubmit={() => handleCreateGame(inputRef.current.value)}
                className="popup-form"
            >
                <label htmlFor="name" className="text-xl">What's your name?</label>
                <input 
                    type="text" 
                    name="name"
                    ref={inputRef} 
                    required autoFocus
                    className="popup-input"
                />
                <button type="submit" 
                    className="popup-btn"
                >Let's go</button>
            </form>
        </dialog>
    );
}

export default HostGamePopup;