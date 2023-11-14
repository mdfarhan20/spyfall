import { createContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    return (
        <GameContext.Provider>
            { children }
        </GameContext.Provider>
    )
}

export default GameContext;