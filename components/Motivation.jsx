"use client";

import React from "react";
import Marquee from "react-fast-marquee";

export default function Motivation() {
    return (
        <div className="h-[50dvh] mt-[100px] w-full rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
            <Marquee autoFill={true}>
                <h1 className="text-7xl sm:text-9xl">
                    WE CREATE • WE DESIGN • WE DELIVER •
                </h1>
            </Marquee>
        </div>
    );
}
