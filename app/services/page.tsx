import Services from "@/app/services/services";
import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";
import {PageProps} from "@/types";

export default function Page(props: PageProps) {
    return (
        <Suspense fallback={<MyLoader/>}>
            <Services props={props}/>
        </Suspense>
    )
}
