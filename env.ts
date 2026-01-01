import {createEnv} from "@t3-oss/env-nextjs";
import {z} from 'zod'

export const env = createEnv({
    server: {
        BACKEND_API_URL: z.url(),
        ENV: z.enum(['local', 'production']),
    },
    client: {
        NEXT_PUBLIC_BACKEND_API_URL: z.url(),
        NEXT_PUBLIC_SITE_URL: z.url(),
    },
    runtimeEnv: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
        ENV: process.env.ENV,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL
    },
})
