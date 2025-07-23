import Button from "@/components/Button";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { Poppins, Roboto } from "next/font/google";
import { useEffect, useRef } from "react";
import Wave from "../pages/animations/wave.json";
// Remove CityFuture import
const roboto = Roboto({ weight: "500", subsets: ["latin"] });
const pop = Poppins({ weight: "500", subsets: ["latin"] });

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Poster() {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const canvaRef = useRef(null);

  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.7 });
    gsap.set([textRef1.current, textRef2.current, textRef3.current], {
      opacity: 0,
    });

    tl.fromTo(
      canvaRef.current,
      { opacity: 0, scale: 0.5, transformOrigin: "bottom" },
      { opacity: 1, scale: 1, transformOrigin: "bottom", duration: 0.6 }
    )
      .fromTo(
        textRef1.current,
        { opacity: 0, top: "10vw" },
        { opacity: 1, top: "0vw", duration: 0.5 },
        "+=0.1"
      )
      .fromTo(
        textRef2.current,
        { opacity: 0, top: "10vw" },
        { opacity: 1, top: "0vw", duration: 0.4 },
        "+=0.07" // delay between the spans
      )
      .fromTo(
        textRef3.current,
        { opacity: 0, top: "10vw" },
        { opacity: 1, top: "0vw", duration: 0.3 },
        "+=0.06"
      )
      .fromTo(
        button1Ref.current,
        { opacity: 0, y: 20, stagger: 0.1 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 },
        "+=0.05"
      );
  }, []);

  return (
    <div className="bg-[#03061c] text-white -mt-[15px]">
      <section className="flex w-full items-center content-center justify-center">
        <div className="w-[100%] md:w-[85%]">
          <div className="flex pl-[1.5rem] lg:pl-[2rem] z-[9] items-center relative gap-[10px] top-[39px]">
            <p className=" text-white">{`Hey, We are PiRhoTech`}</p>
            <Lottie animationData={Wave} loop={true} className="w-[30px]" />
          </div>
          <div className="relative w-full flex flex-col md:flex-row items-start justify-between p-12 pl-[1rem] pr-[1rem] bg-[#03061c]">
            <div className="z-10 top-[50px] absolute w-[95%]">
              <div className="gooey-container h-[50dvh]">
                <div className="flex">
                  <div className="relative overflow-hidden ">
                    <h1
                      className={`gooey-text text-[1.25rem] sml:text-[1.5rem] lg:text-6xl dm:text-5xl sm:text-4xl ss:text-2xl bg-[#03061c] inline tracking-tight rounded-bl-none ${pop.className}`}
                      style={{
                        lineHeight: 1.3,
                        paddingBottom: "25px",
                        borderRadius: "21px 0 21px 21px",
                        position: "relative",
                        left: "-7px",
                        paddingTop: "15px",
                      }}
                    >
                      <span
                        ref={textRef1}
                        className="flex-shrink-0 opacity-0 truncate inline relative pl-3 lg:pl-5"
                        style={{ zIndex: 2 }}
                      >
                        Creative Agency Designing&nbsp;&nbsp;
                        <br />
                      </span>
                      <span
                        ref={textRef2}
                        className="flex-shrink-0 opacity-0 truncate inline relative pl-3 lg:pl-5"
                        style={{ zIndex: 1 }}
                      >
                        {`Tomorrow's Visions `}&nbsp;&nbsp;
                        <br />
                      </span>
                      <span
                        ref={textRef3}
                        className="flex-shrink-0 opacity-0 truncate inline relative pl-3 lg:pl-5"
                        style={{ zIndex: 0 }}
                      >
                        of the Future&nbsp;&nbsp;
                        <br />
                      </span>
                    </h1>
                    <div className="w-[28px] h-[28px]">
                      <svg
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <path
                          d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z"
                          fill="#03061c"
                        ></path>
                      </svg>
                    </div>

                    {/* SVG Filter Definition */}
                    <svg width="0" height="0">
                      <defs>
                        <filter id="goo">
                          <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="6"
                            result="blur"
                          ></feGaussianBlur>
                          <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                          ></feColorMatrix>
                          <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                          ></feComposite>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <svg
                    width="21px"
                    height=""
                    viewBox="0 0 43 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[21px] relative -top-[1px] -left-[15px] sm:-left-[12px]"
                  >
                    <path
                      d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z"
                      fill="#03061c"
                    ></path>
                  </svg>
                </div>
                <div className="flex space-x-4 relative top-[10px]">
                  <Button
                    href="/contact"
                    className=" bg-black relative left-[11px] top-[0px] p-[10px] rounded-[10px] border-none"
                    button1Ref={button1Ref}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-[100%] relative top-[2px] h-[70vh] ss:h-[80dvh] overflow-hidden rounded-[15px] sm:rounded-[30px]">
              <video 
                ref={canvaRef}
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-cover"
              >
                <source src="/videos/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute w-full h-full top-[183px] z-[9999] block sm:hidden"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
