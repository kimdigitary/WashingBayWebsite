import { MetadataRoute } from 'next'
import { env } from '@/env'
import { fetchData } from '@/queries/server'
import { Blog } from '@/app/blog/types'
import { Service } from '@/app/services/types'
import { ApiResponse } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = env.SITE_URL

    // Static routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/booking',
        '/contact',
        '/faq',
        '/gallery',
        '/locations',
        '/pricing',
        '/services',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Fetch dynamic blog posts
    let blogRoutes: MetadataRoute.Sitemap = []
    try {
        const { data: blogs } = await fetchData<ApiResponse<Blog>>('blog/posts')
        blogRoutes = blogs.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.published_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('Failed to fetch blog posts for sitemap:', error)
    }

    // Fetch dynamic services
    let serviceRoutes: MetadataRoute.Sitemap = []
    try {
        const services = await fetchData<Service[]>('services')
        serviceRoutes = services.map((service) => ({
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }))
    } catch (error) {
        console.error('Failed to fetch services for sitemap:', error)
    }

    return [...routes, ...blogRoutes, ...serviceRoutes]
}
