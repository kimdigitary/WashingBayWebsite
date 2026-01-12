import Locations from "@/app/locations/locations";
import {fetchData} from "@/queries/server";
import {Location} from "@/app/locations/types";
import {ApiResponse, PageProps} from "@/types";

interface Props {
    props: PageProps
}

export default async function LocationsServer({props}: Props) {
    const searchParams = props.searchParams
    const {data:locations} = await fetchData<ApiResponse<Location>>('locations', searchParams)
    return (
        <Locations locationsData={locations}/>
    )
}
