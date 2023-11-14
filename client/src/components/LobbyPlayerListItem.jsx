import TickIcon from "components/TickIcon";
import CrossIcon from "components/CrossIcon";

function LobbyPlayerListItem({ player }) {
    return (
        <li className="flex justify-between items-center bg-white p-2 rounded-md">
            { player.username }
            { player.isReady && <TickIcon /> }
            { !player.isReady && <CrossIcon /> }
        </li>
    );
}

export default LobbyPlayerListItem;