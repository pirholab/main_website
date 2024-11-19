import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { WorksWithSlug as Works } from "../../db/works";
import Image from "next/image";
import Navbars from "@/components/Navbars";
import { Footer } from "@/components/Footer";

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const data = Works.filter((e) => e.slug === slug);

  console.log(data);
  const [loading, setLoading] = useState(false);
  const trRef = useRef();

  return (
    <main>
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
                  <button className="text-2xl whitespace-nowrap">
                    Visit Site
                  </button>
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
