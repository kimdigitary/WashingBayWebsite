import {PageProps} from "@/types";
import {Suspense} from "react";
import FetchService from "@/app/services/[id]/fetch-service";

export default async function Page(props: PageProps) {
    const {id} = await props.params
    return (
        <Suspense>
            <FetchService id={id}/>
        </Suspense>
    )
}
