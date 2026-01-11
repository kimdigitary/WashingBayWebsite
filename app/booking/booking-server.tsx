import {fetchData} from "@/queries/server";
import {ExtraServiceResponse, ServicePackageResponse} from "@/types";
import Booking from "@/app/booking/booking";


export default async function BookingServer() {
    const servicePackageResponse = await fetchData<ServicePackageResponse>('packages')
    const extras = await fetchData<ExtraServiceResponse>('extras')
    return <Booking packages={servicePackageResponse.packages}
                    extras={extras.extras}
                    currency={servicePackageResponse.currency}/>
}
