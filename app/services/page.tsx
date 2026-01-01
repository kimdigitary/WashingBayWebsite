import Services from "@/app/services/services";
import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";

export default function Page() {
    return (
        <Suspense fallback={<MyLoader/>}>
            <Services/>
        </Suspense>
    )
}
