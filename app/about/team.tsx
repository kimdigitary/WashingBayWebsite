import Reveal from "@/app/about/reveal";
import React from "react";
import {fetchData} from "@/queries/server";
import {TeamT} from "@/app/about/types";
import {PageProps} from "@/types";

interface Props {
    props: PageProps
}

export default async function Team({props}: Props) {
    const searchParams = props.searchParams
    const teams = await fetchData<TeamT[]>('team', searchParams)
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
            <Reveal className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-theme-text mb-4">
                    Meet The Experts
                </h2>
                <p className="text-gray-600 dark:text-theme-muted">The hands behind the shine.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {teams.map((member, index) => (
                    <Reveal key={index}
                            delay={index * 100}
                            className="group relative overflow-hidden rounded-2xl h-80">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                            <h4 className="text-white font-bold text-lg">{member.name}</h4>
                            <p className="text-theme-red text-xs uppercase font-bold tracking-wider">{member.role}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    )
}
