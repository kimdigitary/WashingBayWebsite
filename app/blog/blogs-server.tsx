import {fetchData} from "@/queries/server";
import {Blog} from "@/app/blog/types";
import Blogs from "@/app/blog/blogs";
import {PageProps} from "@/types";

export default async function BlogsServer(props: PageProps) {
    const searchParams = props.searchParams
    const blogs = await fetchData<Blog[]>('blog/posts', searchParams)
    return (
        <Blogs blogPosts={blogs}/>
    )
}
