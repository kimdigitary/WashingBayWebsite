import Pricing from "@/app/pricing/pricing";
import {fetchData} from "@/queries/server";
import {ApiResponse, ExtraService, ServicePackage} from "@/types";

export default async function Page() {
    const {data} = await fetchData<ApiResponse<ServicePackage>>('packages', undefined)
    const {data: extras} = await fetchData<ApiResponse<ExtraService>>('extras', undefined)
    return <Pricing washPackages={data}
                    extraServices={extras}/>
}
