"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ title, description, image, tags, author, date, slug }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col bg-zinc-700 rounded-[20px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all"
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
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-zinc-300 mb-4 flex-grow">{description}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="rounded-full py-1 px-3 text-xs border border-zinc-500 text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${slug}`} className="self-start">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-[#03061c] rounded-lg transition-colors">
            Read more
            <svg className="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </Link>
      </div>
    </motion.div>
  );
} 