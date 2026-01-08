'use client'
import Link from "next/link";
import BlogReveal from "@/app/blog/blog-reveal";
import {useState} from "react";
import {Blog} from "@/app/blog/types";

interface Props {
    blogPosts: Blog[]
}

export default function Blogs({blogPosts}: Props) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const featuredPost = blogPosts.find(post => post.is_featured) || blogPosts[0];

    const categories = blogPosts.map((post) => post.category)

    const filteredPosts = blogPosts.filter(post => {
        // --- THIS WAS THE PROBLEM LINE ---
        // if (post.id === featuredPost.id) return false;
        // ---------------------------------

        const categoryMatch = selectedCategory === "All" || post.category === selectedCategory;
        const searchMatch = post?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post?.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <div className="bg-white dark:bg-theme-black transition-colors duration-300 min-h-screen">

            {/* HERO SECTION - Links to the Featured Post (Paint Correction) */}
            <Link href={`/blog/${featuredPost?.slug}`}>
                <div className="relative h-[60vh] w-full group cursor-pointer overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{backgroundImage: `url('${featuredPost?.cover_image}')`}}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl w-full">
                        <BlogReveal>
                    <span className="bg-theme-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider mb-4 inline-block shadow-lg">
                        Featured Article
                    </span>
                            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-4 leading-tight group-hover:text-theme-red transition-colors drop-shadow-lg">
                                {featuredPost?.title}
                            </h1>
                            <p className="text-gray-200 text-lg line-clamp-2 max-w-2xl drop-shadow-md">
                                {featuredPost?.excerpt}
                            </p>
                            <div className="mt-6 flex items-center text-gray-300 text-sm font-bold tracking-wide">
                                <span>{featuredPost?.published_at}</span>
                                <span className="mx-2">•</span>
                                <span>{featuredPost?.read_time} Read</span>
                            </div>
                        </BlogReveal>
                    </div>
                </div>
            </Link>

            {/* FILTER BAR */}
            <div className="sticky top-20 z-40 bg-white/90 dark:bg-theme-black/90 backdrop-blur-md border-b border-gray-200 dark:border-theme-accent shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${selectedCategory === cat ? 'bg-theme-red text-white border-theme-red shadow-md' : 'bg-transparent text-gray-500 dark:text-theme-muted border-gray-300 dark:border-theme-accent hover:border-theme-red hover:text-theme-red'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <input type="text"
                               placeholder="Search articles..."
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               className="w-full bg-gray-100 dark:bg-theme-surface border border-gray-300 dark:border-theme-accent rounded-full py-2 pl-4 pr-10 text-sm text-gray-900 dark:text-theme-text focus:outline-none focus:border-theme-red transition-all"/>
                        <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
            </div>

            {/* BLOG GRID */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <BlogReveal key={post.id}
                                    delay={index * 100}>
                            <article className="group bg-white dark:bg-theme-surface rounded-3xl overflow-hidden border border-gray-200 dark:border-theme-accent hover:border-theme-red dark:hover:border-theme-red transition-all duration-300 shadow-lg hover:shadow-2xl h-full flex flex-col">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={post?.cover_image}
                                         alt={post?.title}
                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{post?.category}</div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center text-xs text-gray-400 dark:text-theme-muted mb-4">
                                        <i className="far fa-calendar-alt mr-2"></i> <span>{post?.published_at}</span>
                                        <span className="mx-2">•</span>
                                        <i className="far fa-clock mr-2"></i> <span>{post?.read_time} read</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-theme-text mb-3 group-hover:text-theme-red transition-colors line-clamp-2">{post?.title}</h4>
                                    <p className="text-gray-600 dark:text-theme-muted text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{post?.excerpt}</p>

                                    {/* Correct Link based on slug */}
                                    <Link href={`/blog/${post?.slug}`}
                                          className="inline-flex items-center text-gray-900 dark:text-theme-text text-xs font-bold uppercase tracking-widest hover:text-theme-red transition-colors group/link mt-auto">
                                        Read More <i className="fas fa-arrow-right ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
                                    </Link>
                                </div>
                            </article>
                        </BlogReveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
