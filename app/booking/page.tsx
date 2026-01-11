import {Suspense} from "react";
import BookingServer from "@/app/booking/booking-server";
import MyLoader from "@/components/global/my-loader";

export default function Page() {
    return (
        <Suspense fallback={<MyLoader/>}>
            <BookingServer/>
        </Suspense>
    )
}
