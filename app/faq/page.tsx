import Faqs from "@/app/faq/faqs";
import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";

export default function Page() {
    return (
        <Suspense fallback={<MyLoader/>}>
            <Faqs/>
        </Suspense>
    )
}
