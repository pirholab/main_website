import React, { useState, useRef } from "react";

import { Inter } from "next/font/google";
import Poster from "../components/Poster";
import Navbars from "../components/Navbars";
import Brand from "../components/Brand";
import Who from "../components/Who";

import List from "../components/List";
import Services from "../components/Services";
import Faqs from "@/components/Faqs";
import Motivation from "@/components/Motivation";
import { Footer } from "@/components/Footer";
import Project from "@/components/Project";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();
  return (
    <main className={`relative z-[999] `}>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      <div className="mt-[70px]">
        <Poster />
        <br />
        <Who />

        <Brand />
        <br />
        <br />
        {/* <What /> */}
        <Services />
        <List />

        <Project />
        <Faqs />

        <Motivation />
        <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
        <div
          className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
            loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
          }`}
          style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
          ref={trRef}
        />
      </div>
    </main>
  );
}
