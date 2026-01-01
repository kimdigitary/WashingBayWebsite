import {Suspense} from "react";
import {Loader} from "lucide-react";
import BookingServer from "@/app/booking/booking-server";

export default function Page() {
    return (
        <Suspense fallback={<Loader/>}>
            <BookingServer/>
        </Suspense>
    )
}
