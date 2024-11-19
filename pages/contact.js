import { Footer } from "@/components/Footer";
import Navbars from "@/components/Navbars";
import Send from "@/components/Send";
import { SingleSplitText } from "@/ui/SingleSplitText";
import localFont from "next/font/local";
import React, { useRef, useState } from "react";

const myFont = localFont({ src: "../fonts/old.otf" });
export default function Contact() {
  const [loading, setLoading] = useState(false);
  const trRef = useRef();

  return (
    <main>
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      <div className="mt-[150px] flex justify-center main mb-[250px]">
        <div className="w-[82%]">
          <div className="flex flex-col">
            <h1 className="text-center sm:text-start text-[1.7rem] ss:text-[4rem] md:text-9xl mt-[50px] sm:mt-[100px] flex flex-col md:text-[5rem] lg:text-[6rem]">
              <SingleSplitText>{"Let's build greatest "}</SingleSplitText>
              <SingleSplitText>{"things together 🤗"}</SingleSplitText>
            </h1>
          </div>
          <div className="flex gap-[100px] md:gap-0 mt-[100px] flex-col md:flex-row justify-between flex-wrap">
            <div class="flex items-center w-full md:w-1/2 justify-start bg-transparent">
              <div className="w-full md:w-[550px] ">
                <div class="mx-auto w-full md:max-w-lg">
                  <h1 class="text-4xl font-medium">Contact us</h1>

                  <form
                    action=""
                    class="mt-10"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      type="hidden"
                      name="access_key"
                      value="YOUR_ACCESS_KEY_HERE"
                    />
                    <div class="grid gap-6 sm:grid-cols-2">
                      <div class="relative z-0">
                        <input
                          type="text"
                          name="name"
                          class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                          placeholder=" "
                        />
                        <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                          Your name
                        </label>
                      </div>
                      <div class="relative z-0">
                        <input
                          type="text"
                          name="email"
                          class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                          placeholder=" "
                        />
                        <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                          Your email
                        </label>
                      </div>
                      <div class="relative z-0 col-span-1 ss:col-span-2">
                        <textarea
                          name="message"
                          rows="5"
                          class="peer text-white block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm focus:outline-none focus:ring-0"
                          placeholder=" "
                        ></textarea>
                        <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:text-white">
                          Your message
                        </label>
                      </div>
                    </div>
                    <div className="mt-[30px] sm:mt-[50px]">
                      <Send>Send Message</Send>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <h1
              style={{
                fontWeight: 100,
                fontFamily: "futura-pt, sans-serif",
                fontWeight: "300 500 700 900",
              }}
              className="text-3xl mlg:text-5xl w-full md:w-[37%] mlg:w-1/2 font-100"
            >
              {
                "We're here to bring your concept to life, manage your ongoing project, or expand your existing development team."
              }
            </h1>
          </div>
        </div>
      </div>
      <Footer loading={loading} setLoading={setLoading} trRef={trRef} />
      <div
        className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
          loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
        }`}
        style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
        ref={trRef}
      />
    </main>
  );
}
