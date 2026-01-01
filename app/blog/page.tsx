import {Suspense} from "react";
import MyLoader from "@/components/global/my-loader";
import BlogsServer from "@/app/blog/blogs-server";

export default function Page() {
    return (
        <Suspense fallback={<MyLoader/>}>
            <BlogsServer/>
        </Suspense>
    )
}
