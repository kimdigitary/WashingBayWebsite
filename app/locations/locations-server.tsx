import Locations from "@/app/locations/locations";
import {fetchData} from "@/queries/server";
import {Location} from "@/app/locations/types";
import {PageProps} from "@/types";

export default async function LocationsServer(props: PageProps) {
    const searchParams = props.searchParams
    const locations = await fetchData<Location[]>('locations', searchParams)
    return (
        <Locations locationsData={locations}/>
    )
}
