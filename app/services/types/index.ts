export interface Service {
    id: number
    title: string
    slug: string
    short_description: string
    description: string
    is_featured: boolean
    hero_image: string
    badge: string
    stats: Stat[]
    benefits: string[]
    process_steps: ProcessStep[]
    pricing_plans: PricingPlan[]
}

export interface Stat {
    value: string
    label: string
}

export interface ProcessStep {
    title: string
    description: string
    icon: string
}

export interface PricingPlan {
    name: string
    durability: string
    price: string
    features: string
    is_popular: boolean
}
