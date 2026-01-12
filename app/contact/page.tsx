import {fetchData} from "@/queries/server";
import {ApiShowResponse, ContactT} from "@/types";
import Contact from "@/app/contact/contact";

export default async function Page() {
    const {data} = await fetchData<ApiShowResponse<ContactT>>('contact-page', undefined)
    return (
        <Contact contact={data}/>
    )
}
