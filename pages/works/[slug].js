import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { WorksWithSlug as Works } from "../../db/works";
import Image from "next/image";
import Navbars from "@/components/Navbars";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const data = Works.filter((e) => e.slug === slug);

  console.log(data);
  const [loading, setLoading] = useState(false);
  const trRef = useRef();

  return (
    <main>
       <Head>
        {/* Primary Meta Tags */}
        <title>PiRhotech - Projects Review</title>
        <meta
          name="description"
          content=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon.ico"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo.png"
        />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech.com" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.ico"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="PirRhotech.com" />
        <meta
          property="og:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PirRhotech.com" />
        <meta
          name="twitter:description"
          content="Creative Agency Designing Tomorrow's Visions of the Future"
        />
        <meta name="twitter:image" content="/logo.png" />

        {/* Keywords */}
        <meta
          name="keywords"
          content="Next.js, SEO, favicon, web development, branding"
        />

        {/* Author */}
        <meta name="author" content="Your Name or Company Name" />
      </Head>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      <div className="mt-[150px] flex justify-center main mb-[250px]">
        <div className="flex items-center w-[90%] md:w-[82%]">
          {data?.map((e, i) => (
            <div key={i} className="w-full">
              <h1 className="text-[3rem] sm:text-[5rem]">{e.title}</h1>
              <div className="flex gap-2 mb-[25px] flex-wrap">
                {e?.tags.map((e, i) => (
                  <p key={i} className="rounded-[30px] border p-[10px]">
                    {e}
                  </p>
                ))}
              </div>
              <div className="flex lg:w-full justify-center items-center">
                {e?.image && (
                  <Image
                    src={e?.image}
                    width={300}
                    height={300}
                    alt={e.title}
                    className=" w-full lg:w-[70%] h-full rounded-[25px]"
                  />
                )}
                {console.log("video",e?.video)}
                
                {e?.video && (
                  <video width="320" height="240" className="w-full lg:w-[70%] h-full rounded-[25px]" loop playsInline muted autoPlay>
                    <source src={e?.video} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex flex-col items-start md:flex-row mt-[70px] gap-2 justify-around md:gap-[300px]">
                <p className="text-2xl w-full">{e.description}</p>
                <div className="flex">
                  {e?.demo && <Link href={e?.demo} className="text-2xl whitespace-nowrap">
                    Visit Site
                  </Link>}
                </div>
              </div>
              <div className="flex gap-3 mt-[70px]">
                {e?.extraImages.map((e, i) => (
                  <div key={i}>
                    <Image
                      src={e}
                      width={300}
                      height={300}
                      alt={e.title}
                      priority
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
