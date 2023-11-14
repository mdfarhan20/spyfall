
function GameCard({ location }) {
    return (
        <div className="grid gap-y-4 p-4 rounded-lg bg-yellow-100 ">
            <img src={location.src} className="block w-full max-w-full rounded-lg" />
            <p className="text-center text-2xl tracking-wider font-semibold py-2">{ location.name }</p>
        </div>
    );
}

export default GameCard;