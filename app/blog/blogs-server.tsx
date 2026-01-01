import {fetchData} from "@/queries/server";
import {Blog} from "@/app/blog/types";
import Blogs from "@/app/blog/blogs";

export default async function BlogsServer() {
    const blogs = await fetchData<Blog[]>('blog/posts')
    return (
        <Blogs blogPosts={blogs}/>
    )
}
