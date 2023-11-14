import SpyfallLogo from "components/SpyfallLogo";

function Navbar() {
    return (
        <nav className="w-full flex justify-between items-center py-4 px-2 border-b-2 border-gray-100">
            <h1 className="text-2xl">Spyfall</h1>
            <SpyfallLogo />
        </nav>
    );
}

export default Navbar;