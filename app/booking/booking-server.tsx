import {fetchData} from "@/queries/server";
import {ServicePackage} from "@/types";
import Booking from "@/app/booking/booking";


export default async function BookingServer() {
    const packages = await fetchData<ServicePackage[]>('packages')
    return <Booking packages={packages}/>
}
