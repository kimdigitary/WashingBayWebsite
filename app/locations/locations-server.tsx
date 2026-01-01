import Locations from "@/app/locations/locations";
import {fetchData} from "@/queries/server";
import {Location} from "@/app/locations/types";
import {PageProps} from "@/types";

interface Props {
    props: PageProps
}

export default async function LocationsServer({props}: Props) {
    const searchParams = props.searchParams
    const locations = await fetchData<Location[]>('locations', searchParams)
    return (
        <Locations locationsData={locations}/>
    )
}
