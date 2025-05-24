"use client";

import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import blogData from '@/db/blogs.json';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    // Get the first 3 blogs as featured
    setFeaturedBlogs(blogData.slice(0, 3));
  }, []);

  return (
    <div className="py-16 bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest from Our Blog</h2>
          <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
            Stay updated with the latest insights and tutorials in web development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              tags={blog.tags}
              author={blog.author}
              date={blog.date}
              slug={blog.slug}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/blogs">
            <button className="px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
              View All Blog Posts
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedBlogs; 