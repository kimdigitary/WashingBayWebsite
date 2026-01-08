import {Loader} from "lucide-react";
import React from "react";


export default function MyLoader() {
    return (
        <div className="flex justify-center">
            <Loader
                className="size-4 animate-spin"
                aria-hidden="true"
            />
        </div>
    )
}
