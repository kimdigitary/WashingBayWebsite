export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export interface PageProps {
    searchParams: Promise<SearchParams>;
    params: Promise<{ id: string; }>;
}
