
function GameEndPopup({ gameEndPopup, handleLobbyReturn }) {
    return (
        <dialog ref={gameEndPopup} className="rounded-lg">
            <div className="popup-form">
                <h2 className="text-xl">Game End!</h2>
                <button onClick={handleLobbyReturn} className="popup-btn">Return to Lobby</button>
            </div>
        </dialog>
    );
}

export default GameEndPopup;