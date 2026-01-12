export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export interface PageProps {
    searchParams: Promise<SearchParams>;
    params: Promise<{ id: string; slug: string; }>;
}


export interface ServicePackageResponse {
    currency: string
    disclaimer: string
    packages: ServicePackage[]
}

export interface ServicePackage {
    id: number
    name: string
    description: string
    base_price: number
    base_price_night: number
    suv_surcharge: number
    formatted_base_price: string
    formatted_base_price_night: string
    formatted_suv_surcharge: string
    features: string[]
    is_popular: boolean
    active: boolean
}

export interface ExtraServiceResponse {
    success: boolean
    extras: ExtraService[]
}

export interface ExtraService {
    id: number
    name: string
    price: number
}

export interface ApiResponse<T> {
    data: T[]
    meta: Meta
}

export interface ApiShowResponse<T> {
    data: T
}

export interface Meta {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
    total_amount: number
}

export interface ContactT {
    hero: Hero
    contact_details: ContactDetails
    locations: ContactLocation[]
}

export interface Hero {
    title: string
    subtitle: string
    background_image: string
}

export interface ContactDetails {
    support_email: string
    booking_phone: string
    office_address: string
}

export interface ContactLocation {
    latitude: number
    longitude: number
    zoom_level: number
    marker_label: string
}
export interface BookingResponse {
    success: boolean
    booking_ref: string
    message: string
    booking: Booking
}

export interface Booking {
    id: number
    date: string
    time: string
    status: string
}
