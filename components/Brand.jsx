"use client";

import React, { useEffect, useState } from "react";
import InfiniteMovingCards from "../ui/infinite-moving-cards";
import Slider from 'react-infinite-logo-slider'
import Image from 'next/image'
import Marquee from "react-fast-marquee";

export default function Brand() {
  return (
    <div className="h-[15rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
      <Marquee autoFill={true} >
        {testimonials?.map((e, i) => (

          <div className="relative z-20 mt-6 flex pl-[100px] flex-row items-center" key={i}>
            <Image
              src={e?.image}
              width={100}
              height={100}
              alt="Brans pic"
            />
          </div>

        ))}
      </Marquee>

      {/* <InfiniteMovingCards items={testimonials} direction="left" speed="fast" /> */}
    </div>
  );
}

const testimonials = [
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
  {
    image: "/brands/brand.png",
  },
];
