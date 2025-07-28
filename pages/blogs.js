"use client";

import BlogCard from "@/components/BlogCard";
import { Footer } from "@/components/Footer";
import Navbars from "@/components/Navbars";
import blogData from "@/db/blogs.json";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { Award, ChartGantt, CheckCheck, Filter } from "lucide-react";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [activeTag, setActiveTag] = useState("All");
    const [allTags, setAllTags] = useState(["All"]);
    const [loading, setLoading] = useState(false);
    const trRef = useRef(null);

    useEffect(() => {
        setBlogs(blogData);

        // Extract unique tags
        const tags = new Set(["All"]);
        blogData.forEach((blog) => {
            blog.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags([...tags]);
    }, []);

    const filteredBlogs =
        activeTag === "All"
            ? blogs
            : blogs.filter((blog) => blog.tags.includes(activeTag));

    const handleTagFilter = (tag) => {
        setActiveTag(tag);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <>
            <Head>
                <title>Blogs - PirhoTech</title>
            </Head>
            <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
            <div className="min-h-screen  pt-24 pb-16 px-4 sm:px-6 lg:px-8 mt-[60px]">
                <div className="max-w-7xl mx-auto">
                    {/* <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Blog
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
                            Discover insights, tutorials, and updates about web development and design
                        </p>
                    </motion.div> */}

                    {/* Enhanced background elements */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div
                            className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
                            style={{ animationDelay: "2s" }}
                        ></div>
                        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-l from-orange-500/15 to-purple-500/15 rounded-full blur-2xl"></div>

                        {/* Animated grid */}
                        <div className="absolute inset-0 opacity-[0.02]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
                                    backgroundSize: "50px 50px",
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium mb-4">
                            <ChartGantt className="w-3 h-3" />
                            Our Blog
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
                            From Code{" "}
                            <span className="text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-orange-400 bg-clip-text relative">
                                to Creativity
                                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-30"></div>
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Explore stories, tutorials, and insights that bridge
                            logic and imagination — from deep development dives
                            to design inspiration.
                        </p>
                    </div>

                    {/* Tags filter */}
                    <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-800/50 p-5">
                        <div className="flex items-center gap-1 text-gray-400 mr-1 mb-2">
                            <Filter className="w-3 h-3" />
                            <span className="text-xs font-medium">Filter:</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {allTags.map((tag, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTagFilter(tag)}
                                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                                        activeTag === tag
                                            ? "bg-gradient-to-r from-purple-600 to-orange-600 text-white"
                                            : "bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700/50"
                                    }`}
                                >
                                    {tag}
                                    {activeTag === tag ? (
                                        <CheckCheck className="inline w-3 h-3 ml-1" />
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blog cards grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                    >
                        {filteredBlogs.map((blog) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BlogCard
                                    title={blog.title}
                                    description={blog.description}
                                    image={blog.image}
                                    tags={blog.tags}
                                    author={blog.author}
                                    date={blog.date}
                                    slug={blog.slug}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* No results message */}
                    {filteredBlogs.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl text-zinc-400">
                                No blog posts found for this category.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
            <div
                ref={trRef}
                className="fixed top-0 left-0 w-full h-full bg-[#03061c] z-[99999999999999]"
                style={{ transform: "translateY(100%)" }}
            ></div>
        </>
    );
};

export default Blogs;
