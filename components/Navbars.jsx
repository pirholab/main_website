"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Pivot as Hamburger } from "hamburger-react";
import Button from "@/components/Button";
import TransitionLink from "@/ui/TransitionLink";
import { SingleSplitText } from "@/ui/SingleSplitText";
import Image from "next/image";
var noScroll = require("no-scroll");

const Navbars = ({ loading, setLoading, trRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [height, setHeight] = useState("65px");
  const [width, setWidth] = useState("85%");
  const [top, setTop] = useState("10px");

  const navbarRef = useRef(null);

  const linksRef = useRef(null);
  const adjustHeight = () => {
    if (window.innerWidth <= 767) {
      setHeight("65px");
      setWidth("100%");
      setTop("0px");
    } else {
      setWidth("85%");
      setHeight("50px");
      setTop("10px");
    }
  };
  const controlNavbar = useCallback(() => {
    if (isMenuOpen) return; // Skip navbar control when menu is open
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen]);

  useEffect(() => {
    adjustHeight();
    const handleScroll = () => {
      window.requestAnimationFrame(controlNavbar);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", adjustHeight);
    };
  }, [controlNavbar]);
  const tl = gsap.timeline();
  useEffect(() => {
    const navbar = document.querySelector("#navOption");
    const navbarCom = navbarRef.current;
    if (isMenuOpen) {
      noScroll.on();

      gsap.to("body", { overflow: "hidden" });

      if (lastScrollY > 0) {
        console.log("opening in 70 percent");
        tl.fromTo(
          navbarCom,
          {
            width: "100%",
            backgroundColor: "rgba(29, 28, 28, 0.596)",
            backdropFilter: "blur(30px)",
            borderRadius: "0px",
          },
          {
            width: "100%",
            duration: 0.1,
            top: top,
            ease: "power1.out",
            onComplete: () => {
              document.documentElement.style.overflow = "hidden";
              navbar.style.background = "rgba(29, 28, 28, 0.596)";
              navbar.style.backdropFilter = "blur(30px)";
            },
          }
        )
          .to(
            navbarRef.current,
            {
              duration: 0.1,
              delay: 0.2,
              height: "100%", // Set height here
            },
            "+=0.1"
          )
          .fromTo(
            linksRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.1,
              delay: 0.2,
              ease: "power1.out",
            }
          );
      } else {
        console.log("opening in 100 percent");
        document.body.style.scrolling = "no";
        navbar.style.width = "100%";
        navbar.style.height = "100%";
        navbar.style.position = "fixed";
        navbar.style.top = top;
        navbar.style.left = "0";
        navbar.style.background = "rgba(29, 28, 28, 0.596)";
        navbar.style.backdropFilter = "blur(30px)";
        navbar.style.zIndex = "99999999";
        navbar.style.borderRadius = "0px";
        tl.fromTo(
          linksRef.current,
          {
            opacity: 0,
            duration: 0.1,
          },
          {
            opacity: 1,
            duration: 0.1,
            delay: 0.2,
            ease: "power1.out",
            onComplete: () => {
              document.documentElement.style.overflow = "hidden";
            },
          }
        );
      }
    } else {
      noScroll.off();

      document.body.style.overflow = "unset";
      if (lastScrollY > 0) {
        console.log("closeing in 70 percent");
        navbar.style.width = "70%";
        navbar.style.height = height;
        navbar.style.position = "fixed";
        navbar.style.top = "10px";
        navbar.style.left = "0";
        navbar.style.borderRadius = "9999px";
        navbar.style.background = "rgba(29, 28, 28, 0.596)";
        navbar.style.backdropFilter = "blur(30px)";
        navbar.style.zIndex = "99999999";
      } else {
        console.log("closing in 100%");
        // navbar.style.width = "100%";
        navbar.style.height = height;
        navbar.style.borderRadius = "0px";
        navbar.style.position = "fixed";
        navbar.style.top = top;
        navbar.style.left = "0";
        navbar.style.background = "transparent";
        navbar.style.backdropFilter = "blur(30px)";
        navbar.style.zIndex = "999999999";
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      tl.kill();
    };
  }, [isMenuOpen]);
  return (
    <div>
      <nav
        className={`fixed h-[65px] md:h-auto ${
          lastScrollY > 0 ? "w-[70%] md:w-[70%]" : "w-full md:w-[85%]"
        } top-5 left-0 right-0 transition-all duration-300 ease-in-out mx-auto z-[9999999999999]`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-150%)",
          backgroundColor:
            lastScrollY > 0 ? "rgba(29, 28, 28, 0.596)" : "rgba(87, 86, 86, 0)",
          backdropFilter: lastScrollY > 0 ? "blur(15px)" : "blur(0px)",
          borderRadius: lastScrollY > 0 ? "9999px" : "0px",
          top: lastScrollY > 0 ? "10px" : top,
          height: "65px",
          width: lastScrollY > 0 ? "70%" : width,
        }}
        ref={navbarRef}
        id="navOption"
      >
        <div className="relative md:top-auto mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center pl-[8px] sm:pl-[0px]">
              
              <TransitionLink
                  href="/"
                  className="text-white flex items-start justify-center gap-3 font-bold text-lg"
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                >
                
               <Image src={"/logo.svg"} alt="phirotech.com" width={20} height={20}/>
                PiRoTech
                </TransitionLink>
              
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 text-white">
                <TransitionLink
                  href="/"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                >
                  Home
                </TransitionLink>
                <TransitionLink
                  href="/about"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                >
                  About
                </TransitionLink>
                <Link
                  href="/blogs"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                >
                  Blogs
                </Link>
                <TransitionLink
                  href="/contact"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                >
                  Contact
                </TransitionLink>
              </div>
            </div>
            <Button href={"/contact"} className="hidden lg:flex text-nowrap">Get Started</Button>
            <div className="block md:hidden">
              <Hamburger
                size={17}
                onToggle={(toggled) => {
                  setIsMenuOpen(toggled);
                }}
              />
            </div>
          </div>
          <div
            className={`text-white text-lg z-50 flex-col items-center h-[50dvh] ${
              isMenuOpen ? "flex" : "hidden"
            } justify-center`}
            ref={linksRef}
          >
            <TransitionLink
              href="/"
              className="navanimation pt-[30px] text-5xl"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
            >
              Home
            </TransitionLink>
            <TransitionLink
              href="/about"
              className="navanimation pt-[30px] text-5xl"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
            >
              About
            </TransitionLink>
            <Link href="/blogs" className="navanimation pt-[30px] text-5xl">
              Blogs
            </Link>
            <TransitionLink
              href="/contact"
              className="navanimation pt-[30px] text-5xl"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
            >
              Contact
            </TransitionLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbars;
