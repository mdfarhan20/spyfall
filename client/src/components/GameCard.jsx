import { useState } from "react";
import { hide } from "locations";

function GameCard({ location }) {
    const [hidden, setHidden] = useState(false);

    return (
        <div className="grid gap-y-4 p-4 rounded-lg bg-yellow-100" onClick={() => setHidden(!hidden)}>
            { hidden && <img src={hide.src} className="block w-full max-w-full rounded-lg" /> }
            { !hidden && <img src={location.src} className="block w-full max-w-full rounded-lg" /> }
            <p className="text-center text-2xl tracking-wider font-semibold py-2">{ hidden ? hide.name : location.name }</p>
        </div>
    );
}

export default GameCard;