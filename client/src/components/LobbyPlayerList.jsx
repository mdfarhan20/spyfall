import LobbyPlayerListItem from "components/LobbyPlayerListItem";

function LobbyPlayerList({ playersInLobby }) {
    return (
        <ul className="grid gap-y-4 border-2 border-gray-600 p-4 rounded-md bg-yellow-100">
            { playersInLobby.map(pl => (
                <LobbyPlayerListItem key={pl.id} player={pl} />
            )) }
        </ul>
    );
}

export default LobbyPlayerList;