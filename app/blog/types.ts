export interface Blog {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    cover_image: string
    author: Author
    published_at: string
    is_featured: boolean
    category: string
    read_time: string
    meta: Meta
}

export interface Author {
    name: string
    role: string
    avatar: string
}

export interface Meta {
    description: string
    keywords: string[]
}
