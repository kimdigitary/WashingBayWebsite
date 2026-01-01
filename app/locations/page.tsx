import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";
import LocationsServer from "@/app/locations/locations-server";
import {PageProps} from "@/types";

export default function Page(props: PageProps) {
    return (
        <Suspense fallback={<MyLoader/>}>
            <LocationsServer props={props}/>
        </Suspense>
    )
}
