export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export interface PageProps {
    searchParams: Promise<SearchParams>;
    params: Promise<{ id: string; }>;
}
export interface ServicePackage {
    id: string
    name: string
    description: string
    formatted_base_price: string
    formatted_suv_surcharge: string
    base_price: number
    suv_surcharge: number
    features: string[]
    is_popular: boolean
    active: boolean
}
