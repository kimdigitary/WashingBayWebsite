import type {Metadata} from "next";
import {Manrope, Outfit} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/header";
import FloatingButtons from "@/components/FloatingButtons";
import Image from "next/image";

const manrope = Manrope({subsets: ["latin"], variable: "--font-manrope"});
const outfit = Outfit({subsets: ["latin"], variable: "--font-outfit"});

export const metadata: Metadata = {
    title: "DBS Premier | Home",
    description: "Experience the deepest black and the brightest shine.",
    icons: {
        icon: "/favicon.png",
        apple: "/logo.png",
    },
    openGraph: {
        title: "DBS Premier | Home",
        description: "Experience the deepest black and the brightest shine.",
        url: "https://dbspremier.com",
        siteName: "DBS Premier",
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 600,
                alt: "DBS Premier Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DBS Premier | Home",
        description: "Experience the deepest black and the brightest shine.",
        images: ["/logo.png"],
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en"
              className={`dark ${manrope.variable} ${outfit.variable}`}
              suppressHydrationWarning>
        <head>
            {/* Updated to version 6.5.1 to support the 'X' (Twitter) icon */}
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
        </head>
        <body className="bg-theme-black text-theme-text antialiased flex flex-col min-h-screen transition-colors duration-300 relative">

        <FloatingButtons/>

        <Header/>


        <main className="flex-1 mt-20 relative overflow-hidden bg-theme-black transition-colors duration-300">
            {children}
        </main>

        <footer className="bg-theme-surface border-t border-theme-accent pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-8xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column & Socials */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="text-theme-red text-2xl mr-2 relative w-10 h-10">
                                {/*<i className="fas fa-shield-alt"></i>*/}
                                <Image src={'/logo.png'} alt={'logo'} fill className="object-contain" />
                            </div>
                            <h2 className="font-display font-bold text-xl text-theme-text">
                                DBS <span className="text-theme-red">PREMIUM CAR WASH</span>
                            </h2>
                        </div>
                        <p className="text-theme-muted text-sm leading-relaxed mb-6">
                            Premium automotive care services designed for enthusiasts who demand perfection.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/1KLjx4Jokv/?mibextid=wwXIfr"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Facebook"
                               className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-bg border border-theme-accent text-theme-muted hover:text-white hover:bg-theme-red hover:border-theme-red transition-all duration-300">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://x.com/dbspremicarwash?s=21"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="X (Twitter)"
                               className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-bg border border-theme-accent text-theme-muted hover:text-white hover:bg-theme-red hover:border-theme-red transition-all duration-300">
                                <i className="fab fa-x-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/dbspremicarwash?igsh=aDBwbmZid2ZwcjRq"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="Instagram"
                               className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-bg border border-theme-accent text-theme-muted hover:text-white hover:bg-theme-red hover:border-theme-red transition-all duration-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.tiktok.com/@dbspremiumcarwash?_r=1&_t=ZM-92iJ3Q4mQBv"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="TikTok"
                               className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-bg border border-theme-accent text-theme-muted hover:text-white hover:bg-theme-red hover:border-theme-red transition-all duration-300">
                                <i className="fab fa-tiktok"></i>
                            </a>
                            <a href="https://linkedin.com"
                               target="_blank"
                               rel="noopener noreferrer"
                               aria-label="LinkedIn"
                               className="w-8 h-8 flex items-center justify-center rounded-full bg-theme-bg border border-theme-accent text-theme-muted hover:text-white hover:bg-theme-red hover:border-theme-red transition-all duration-300">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-theme-text font-bold mb-4 font-display">Services</h4>
                        <ul className="space-y-2 text-theme-muted text-sm">
                            <li><Link href="/services"
                                      className="hover:text-theme-red transition-colors">Express Wash</Link></li>
                            <li><Link href="/services"
                                      className="hover:text-theme-red transition-colors">Ceramic Coating</Link></li>
                            <li><Link href="/services"
                                      className="hover:text-theme-red transition-colors">Paint Correction</Link></li>
                            <li><Link href="/services"
                                      className="hover:text-theme-red transition-colors">Interior Detail</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-theme-text font-bold mb-4 font-display">Company</h4>
                        <ul className="space-y-2 text-theme-muted text-sm">
                            <li><Link href="/about"
                                      className="hover:text-theme-red transition-colors">About Us</Link></li>
                            <li><Link href="/blog"
                                      className="hover:text-theme-red transition-colors">Blog</Link></li>
                            <li><Link href="/locations"
                                      className="hover:text-theme-red transition-colors">Locations</Link></li>
                            <li><Link href="/gallery"
                                      className="hover:text-theme-red transition-colors">Gallery</Link></li>
                            <li><Link href="/faq"
                                      className="hover:text-theme-red transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-theme-text font-bold mb-4 font-display">Contact</h4>
                        <ul className="space-y-3 text-theme-muted text-sm">
                            <li className="flex items-start">
                                <i className="fas fa-phone mt-1 mr-3 text-theme-red"></i>
                                <span>+256 748151515</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-envelope mt-1 mr-3 text-theme-red"></i>
                                <span>support@dbspremier.com</span>
                            </li>
                            <li className="flex items-start">
                                <i className="fas fa-map-marker-alt mt-1 mr-3 text-theme-red"></i>
                                <span>Kampala, Uganda</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-theme-accent pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-theme-muted">
                    <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} DBS Premium Car Wash. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy"
                              className="hover:text-theme-red transition-colors">Privacy Policy</Link>
                        <Link href="/terms"
                              className="hover:text-theme-red transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>

        </body>
        </html>
    );
}
