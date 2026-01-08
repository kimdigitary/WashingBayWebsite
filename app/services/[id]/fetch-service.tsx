import {fetchData} from "@/queries/server";
import {Service} from "@/app/services/types";
import ServiceDetails from "@/app/services/[id]/service-details";

export default async function FetchService({id}: { id: string }) {
    const data = await fetchData<Service[]>(`services`, undefined)
    return (
       <ServiceDetails services={data}  slug={id}/>
    )
}
