import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";
import BlogsServer from "@/app/blog/blogs-server";
import {PageProps} from "@/types";

export default function Page(props:PageProps) {
    return (
        <Suspense fallback={<MyLoader/>}>
            <BlogsServer props={props}/>
        </Suspense>
    )
}
