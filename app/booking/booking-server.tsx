import {fetchData} from "@/queries/server";
import {ApiResponse, ExtraService, ServicePackage} from "@/types";
import Booking from "@/app/booking/booking";
import {Location} from "@/app/locations/types";


export default async function BookingServer() {
    const {data:packages} = await fetchData<ApiResponse<ServicePackage>>('packages')
    const {data:extras} = await fetchData<ApiResponse<ExtraService>>('extras')
    const {data:locations} = await fetchData<ApiResponse<Location>>('locations')
    return <Booking packages={packages}
                    extras={extras}
                    currency={'UGX'}
                    locations={locations}/>
}
