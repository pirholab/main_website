"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const firacode = localFont({
    src: "../fonts/firacode/FiraCode-Regular.ttf",
});

export default function BlogCard({
    title,
    description,
    image,
    tags,
    author,
    date,
    slug,
}) {
    return (
        <Link
            href={`/blog/${slug}`}
            className="relative flex flex-col bg-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden hover:-translate-y-3 border border-gray-800/50 hover:border-purple-500/40 shadow-lg hover:shadow-xl  hover:shadow-purple-500/20 transition-all duration-700 h-full  group"
        >
            {/* <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none group-hover:animate-pulse">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
            </div> */}

            {/* Enhanced accent shapes */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-orange-500/30 rounded-full blur-2xl group-hover:from-purple-500/50 group-hover:to-orange-500/50 transition-all duration-700"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
            <div className="absolute top-1/2 right-0 w-16 h-16 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-lg"></div>

            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={
                        image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                    }
                    alt={title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    width={500}
                    height={300}
                    priority={true}
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2 text-sm text-zinc-400">
                    <span>{author}</span>
                    <span>{date}</span>
                </div>
                <h3 className="text-xl mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 group-hover:bg-clip-text">
                    {title}
                </h3>
                <p className="text-zinc-400 mb-4 flex-grow">{description}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                    {tags?.map((tag, i) => (
                        <span
                            key={i}
                            className={`px-2 py-1 text-xs bg-gray-800/60 text-gray-300 rounded border border-gray-700/50 group-hover:bg-gray-800 transition-all duration-300 ${firacode.className}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link href={`/blog/${slug}`} className="self-start">
                    <button className="flex-1 px-4 py-2 bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-semibold rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5">
                        Read more
                        <svg
                            className="w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button>
                    {/* <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-[#03061c] rounded-lg transition-colors">
                        Read more
                        <svg
                            className="w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </button> */}
                </Link>
            </div>
        </Link>
    );
}
