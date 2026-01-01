import Locations from "@/app/locations/locations";
import {fetchData} from "@/queries/server";
import {Location} from "@/app/locations/types";

export default async function LocationsServer() {
    const locations = await fetchData<Location[]>('locations')
    return (
        <Locations locationsData={locations}/>
    )
}
