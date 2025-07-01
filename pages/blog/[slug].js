"use client";

import { Footer } from '@/components/Footer';
import Navbars from '@/components/Navbars';
import blogData from '@/db/blogs.json';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const BlogPost = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [blog, setBlog] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [navLoading, setNavLoading] = useState(false);
    const trRef = useRef(null);

    // Function to parse and process HTML content
    const processContent = (content) => {
        if (!content) return '';
        
        // Create a temporary DOM element
        const temp = document.createElement('div');
        temp.innerHTML = content;
        
        // Find all pre > code elements and apply syntax highlighting
        const codeBlocks = temp.querySelectorAll('pre code');
        
        codeBlocks.forEach((codeBlock) => {
            const code = codeBlock.textContent;
            const language = codeBlock.className.replace('language-', '') || 'javascript';
            
            // Create a placeholder to replace with the SyntaxHighlighter component
            const placeholder = `<div class="syntax-highlight" data-code="${encodeURIComponent(code)}" data-language="${language}"></div>`;
            
            // Replace the pre element with our placeholder
            const preElement = codeBlock.parentElement;
            preElement.outerHTML = placeholder;
        });
        
        return temp.innerHTML;
    };

    // Component to render syntax highlighted code
    const CodeHighlight = ({ code, language }) => {
        return (
            <SyntaxHighlighter 
                language={language} 
                style={atomDark}
                customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1.25rem',
                    backgroundColor: 'rgba(39, 39, 42, 0.5)',
                    border: '1px solid rgba(63, 63, 70, 0.5)',
                    marginTop: '1.5rem',
                    marginBottom: '1.5rem'
                }}
            >
                {code}
            </SyntaxHighlighter>
        );
    };

    // Component to render the blog content with highlighted code
    const RenderContent = ({ content }) => {
        if (!content) return null;
        
        const processedContent = processContent(content);
        
        // Split the content by our placeholder
        const parts = processedContent.split(/<div class="syntax-highlight" data-code="([^"]*)" data-language="([^"]*)">\s*<\/div>/);
        
        // Construct an array of elements to render
        const elements = [];
        
        for (let i = 0; i < parts.length; i++) {
            if (i % 3 === 0) {
                // This is regular HTML content
                if (parts[i]) {
                    elements.push(
                        <div key={`html-${i}`} dangerouslySetInnerHTML={{ __html: parts[i] }} />
                    );
                }
            } else if (i % 3 === 1) {
                // This is the code to highlight
                const code = decodeURIComponent(parts[i]);
                const language = parts[i + 1];
                
                elements.push(
                    <CodeHighlight key={`code-${i}`} code={code} language={language} />
                );
                
                // Skip the next part since we've used it already
                i++;
            }
        }
        
        return (
            <div className="prose prose-invert prose-lg max-w-none">
                {elements}
            </div>
        );
    };

    useEffect(() => {
        if (slug) {
            const foundBlog = blogData.find(blog => blog.slug === slug);
            setBlog(foundBlog);
            setPageLoading(false);
        }
    }, [slug]);

    if (pageLoading) {
        return (
            <>
                <Navbars loading={navLoading} setLoading={setNavLoading} trRef={trRef} />
                <div className="min-h-screen bg-[#03061c] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="animate-pulse">Loading...</div>
                </div>
                <Footer />
                <div
                    ref={trRef}
                    className="fixed top-0 left-0 w-full h-full bg-[#03061c] z-[99999999999999]"
                    style={{ transform: "translateY(100%)" }}
                ></div>
            </>
        );
    }

    if (!blog) {
        return (
            <>
                <Navbars loading={navLoading} setLoading={setNavLoading} trRef={trRef} />
                <div className="min-h-screen bg-[#03061c] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Blog post not found</h1>
                    <p className="text-zinc-300 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
                    <Link href="/blogs">
                        <button className="px-6 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
                            Return to Blog
                        </button>
                    </Link>
                </div>
                <Footer />
                <div
                    ref={trRef}
                    className="fixed top-0 left-0 w-full h-full bg-[#03061c] z-[99999999999999]"
                    style={{ transform: "translateY(100%)" }}
                ></div>
            </>
        );
    }

    return (
        <>
            <Navbars loading={navLoading} setLoading={setNavLoading} trRef={trRef} />
            
            {/* Hero Section - Title at Bottom */}
            <div className="w-full h-[65vh] relative">
                <Image
                    src={blog.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    fill
                    priority={true}
                />
                
                {/* Dark gradient overlay with stronger gradient at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-zinc-900/5 flex flex-col justify-end">
                    <div className="max-w-5xl mx-auto w-[90%] pl-0 pr-4 sm:pl-0 sm:pr-6 lg:pl-0 lg:pr-8 pb-16">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight text-left"
                        >
                            {blog.title}
                        </motion.h1>
                        
                        {/* Tag pills - moved below title */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-4"
                        >
                            {blog.tags.map((tag, i) => (
                                <span 
                                    key={i}
                                    className="rounded-full py-1 px-4 text-xs border border-zinc-400/30 text-white bg-zinc-800/30 backdrop-blur-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex items-center text-zinc-300 mb-4 text-sm"
                        >
                            <span className="font-medium">{blog.author}</span>
                            <span className="mx-3">•</span>
                            <span>{blog.date}</span>
                        </motion.div>
                        
                        {/* Scroll indicator - positioned right after the author/date */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="flex items-center mt-2"
                        >
                            <span className="text-white/70 text-sm mr-2">Scroll</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-[#03061c] relative">
                {/* Description Section with Blur */}
                <div className="relative border-b border-cyan-500/10">
                   
                    <div className="max-w-5xl mx-auto pl-[20px] pr-4 sm:pl-0 sm:pr-6 lg:pl-0 lg:pr-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="w-1 h-full max-h-20 bg-gradient-to-b from-cyan-400 to-purple-600 absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full"></div>
                            <p className="text-2xl text-white leading-relaxed py-2 font-light">
                                {blog.description}
                            </p>
                        </motion.div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto pl-[20px] pr-4 sm:pl-0 sm:pr-6 lg:pl-0 lg:pr-8 py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <RenderContent content={blog.content} />
                    </motion.div>

                    {/* Back to blogs and share section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-16 pt-8 border-t border-zinc-800"
                    >
                        <div className="flex justify-between items-center">
                            <Link href="/blogs">
                                <button className="group flex items-center text-zinc-400 hover:text-white transition-colors">
                                    <svg className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    Back to all blogs
                                </button>
                            </Link>
                            
                            <div className="flex gap-4">
                                <button className="text-zinc-400 hover:text-cyan-400 transition-colors p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                                <button className="text-zinc-400 hover:text-pink-400 transition-colors p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
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

export default BlogPost; 