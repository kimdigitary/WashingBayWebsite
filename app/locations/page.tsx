import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";
import LocationsServer from "@/app/locations/locations-server";

export default function Page() {
    return (
        <Suspense fallback={<MyLoader/>}>
            <LocationsServer/>
        </Suspense>
    )
}
