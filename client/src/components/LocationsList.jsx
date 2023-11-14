import { locations } from "locations";
import Location from "components/Location";

function LocationsList() {
    return (
        <ul className="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-5 lg:place-content-start">
            { locations.map((location) => (
                <Location key={location.id} location={location} />
            ) ) }
        </ul>
    )
}

export default LocationsList;