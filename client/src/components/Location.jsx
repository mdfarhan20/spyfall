
function Location({ location }) {
    return (
        <li className="relative h-fit">
            <img className="block w-full max-w-full rounded-lg" src={ location.src } />

            <p 
                className="absolute top-1/2 left-1/2 translate-center w-full text-center
                text-white text-lg font-semibold tracking-wide -translate-x-1/2 -translate-y-1/2 z-20"
            >
                { location.name }
            </p>
        </li>
    );
}

export default Location;