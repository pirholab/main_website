"use client";

import BlogCard from '@/components/BlogCard';
import { Footer } from '@/components/Footer';
import Navbars from '@/components/Navbars';
import blogData from '@/db/blogs.json';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [activeTag, setActiveTag] = useState('All');
    const [allTags, setAllTags] = useState(['All']);
    const [loading, setLoading] = useState(false);
    const trRef = useRef(null);

    useEffect(() => {
        setBlogs(blogData);
        
        // Extract unique tags
        const tags = new Set(['All']);
        blogData.forEach(blog => {
            blog.tags.forEach(tag => tags.add(tag));
        });
        setAllTags([...tags]);
    }, []);

    const filteredBlogs = activeTag === 'All' 
        ? blogs 
        : blogs.filter(blog => blog.tags.includes(activeTag));

    const handleTagFilter = (tag) => {
        setActiveTag(tag);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
            <div className="min-h-screen bg-zinc-800 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Blog</h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
                            Discover insights, tutorials, and updates about web development and design
                        </p>
                    </motion.div>

                    {/* Tags filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {allTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTagFilter(tag)}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${
                                    activeTag === tag 
                                    ? 'bg-white text-zinc-800 font-medium' 
                                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Blog cards grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                            <p className="text-xl text-zinc-400">No blog posts found for this category.</p>
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