import {fetchData} from "@/queries/server";
import {Blog} from "@/app/blog/types";
import Blogs from "@/app/blog/blogs";
import {ApiResponse, PageProps} from "@/types";

interface Props {
    props: PageProps
}

export default async function BlogsServer({props}: Props) {
    const searchParams = props.searchParams
    const {data:blogs} = await fetchData<ApiResponse<Blog>>('blog/posts', searchParams)
    return (
        <Blogs blogPosts={blogs}/>
    )
}
