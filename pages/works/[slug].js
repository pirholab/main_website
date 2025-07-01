import { Footer } from "@/components/Footer";
import Navbars from "@/components/Navbars";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { WorksWithSlug as Works } from "../../db/works";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const Index = () => {
  const router = useRouter();
  const { slug } = router.query;
  const data = Works.filter((e) => e.slug === slug);
  const [loading, setLoading] = useState(false);
  const trRef = useRef();
  
  // Refs for animations
  const containerRef = useRef();
  const heroRef = useRef();
  const titleRef = useRef();
  const overviewRef = useRef();
  const problemSolutionRef = useRef();
  const featuresRef = useRef();
  const galleryRef = useRef();
  const techRef = useRef();
  const ctaRef = useRef();
  const testimonialsRef = useRef();
  const futurePlansRef = useRef();

  useEffect(() => {
    if (!data[0]) return;

    const ctx = gsap.context(() => {
      // Initial page load animation
      const tl = gsap.timeline();
      
      // Hero section entrance
      tl.set([".hero-content", ".hero-image"], { opacity: 0, y: 100 })
        .to(".hero-content", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(".hero-image", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8");

      // Animated title typing effect
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          text: data[0].title,
          duration: 2,
          ease: "none",
          delay: 0.5
        });
      }

      // Scroll-triggered animations
      
      // Tags animation
      gsap.fromTo(".tag-item", {
        scale: 0,
        rotation: 180,
        opacity: 0
      }, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".tags-container",
          start: "top 80%"
        }
      });

      // Project info cards
      gsap.fromTo(".info-card", {
        y: 50,
        opacity: 0,
        rotationX: -15
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-info",
          start: "top 85%"
        }
      });

      // Hero image parallax
      gsap.to(".hero-image-container", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-image-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Overview section
      gsap.fromTo(".overview-content", {
        x: -100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 80%"
        }
      });

      // Problem/Solution cards
      gsap.fromTo(".problem-card", {
        x: -100,
        opacity: 0,
        rotationY: -15
      }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: problemSolutionRef.current,
          start: "top 75%"
        }
      });

      gsap.fromTo(".solution-card", {
        x: 100,
        opacity: 0,
        rotationY: 15
      }, {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: problemSolutionRef.current,
          start: "top 75%"
        }
      });

      // Features grid animation
      gsap.fromTo(".feature-card", {
        y: 80,
        opacity: 0,
        scale: 0.8
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: {
          amount: 0.8,
          grid: "auto",
          from: "center"
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%"
        }
      });

      // Gallery images stagger
      gsap.fromTo(".gallery-item", {
        y: 60,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%"
        }
      });

      // Technology tags animation
      gsap.fromTo(".tech-tag", {
        scale: 0,
        opacity: 0,
        rotation: 360
      }, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 80%"
        }
      });

      // CTA section
      gsap.fromTo(".cta-content", {
        scale: 0.8,
        opacity: 0,
        y: 50
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%"
        }
      });

      // Floating animation for special elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });

      // Background gradient animation
      gsap.to(".bg-gradient", {
        backgroundPosition: "100% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Testimonials animation
      gsap.fromTo(".testimonial-card", {
        y: 60,
        opacity: 0,
        rotationY: -15
      }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%"
        }
      });

      // Future plans animation
      gsap.fromTo(".future-plans-card", {
        scale: 0.9,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: futurePlansRef.current,
          start: "top 80%"
        }
      });

      // CTA animation with background gradient movement
      gsap.fromTo(".cta-content", {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%"
        }
      });

      // Animated gradient background for CTA
      gsap.to(".cta-content", {
        backgroundPosition: "200% 200%",
        duration: 15,
        ease: "none",
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  // Interactive hover effects
  const handleCardHover = (e, isEntering) => {
    const card = e.currentTarget;
    gsap.to(card, {
      scale: isEntering ? 1.05 : 1,
      rotationY: isEntering ? 5 : 0,
      z: isEntering ? 50 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleImageHover = (e, isEntering) => {
    const image = e.currentTarget.querySelector('img') || e.currentTarget.querySelector('video');
    gsap.to(image, {
      scale: isEntering ? 1.1 : 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  return (
    <main 
      ref={containerRef}
      className="bg-gradient bg-gradient-to-br from-[#0a0a0f] via-[#03061c] to-[#1a1a1f] text-white min-h-screen relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl floating-element" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
      </div>

       <Head>
        {/* Primary Meta Tags */}
        <title>{data[0]?.title || "PiRhoTech"} - Case Study | PiRhoTech</title>
        <meta
          name="description"
          content={data[0]?.overview || "PiRhoTech project case study showcasing our creative technology solutions."}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.ico" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <meta name="apple-mobile-web-app-title" content="PiRhoTech" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://pirhotech.com/works/${slug}`} />
        <meta property="og:title" content={`${data[0]?.title || "Project"} Case Study | PiRhoTech`} />
        <meta property="og:description" content={data[0]?.overview || "PiRhoTech project case study showcasing our creative technology solutions."} />
        <meta property="og:image" content={data[0]?.image ? `https://pirhotech.com${data[0].image}` : "https://pirhotech.com/og-image.png"} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://pirhotech.com/works/${slug}`} />
        <meta name="twitter:title" content={`${data[0]?.title || "Project"} Case Study | PiRhoTech`} />
        <meta name="twitter:description" content={data[0]?.overview || "PiRhoTech project case study showcasing our creative technology solutions."} />
        <meta name="twitter:image" content={data[0]?.image ? `https://pirhotech.com${data[0].image}` : "https://pirhotech.com/logo.png"} />

        {/* Keywords */}
        <meta name="keywords" content={`PiRhoTech, ${data[0]?.title || "project"}, case study, ${data[0]?.tags?.join(", ") || "technology"}`} />

        {/* Author */}
        <meta name="author" content="PiRhoTech" />
      </Head>
      
      <Navbars loading={loading} setLoading={setLoading} trRef={trRef} />
      
      <div className="relative z-10">
        {data?.map((project, i) => (
          <div key={i} className="pt-[120px] pb-[100px]">
            {/* Hero Section */}
            <div ref={heroRef} className="container mx-auto px-4 sm:px-6 lg:px-8 mb-32">
              <div className="w-full text-center mb-16">
                <div className="hero-content mb-16">
                  <div className="tags-container flex justify-center gap-3 mb-12 flex-wrap">
                    {project?.tags?.map((tag, j) => (
                      <span 
                        key={j}
                        className="tag-item rounded-full bg-gradient-to-r from-[#2a2a30] to-[#2d2d35] px-8 py-3 text-sm font-medium text-blue-300 shadow-lg border border-blue-900/30 backdrop-blur-sm cursor-pointer hover:border-blue-700/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h1 
                    ref={titleRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 leading-tight"
                    style={{
                      textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {/* Title will be animated via GSAP */}
                  </h1>
                  
                  <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                    {project.overview || project.description}
                  </p>
                </div>
                
                {project?.clientName && (
                  <div className="project-info flex flex-wrap justify-center gap-8 mt-16">
                    <div className="info-card text-center bg-[#1d1d22]/60 backdrop-blur-lg py-6 px-8 rounded-2xl shadow-2xl border border-gray-700/50">
                      <p className="font-bold text-blue-400 uppercase tracking-wider mb-3 text-sm">CLIENT</p>
                      <p className="font-semibold text-xl text-gray-200">{project.clientName}</p>
                    </div>
                    {project?.clientIndustry && (
                      <div className="info-card text-center bg-[#1d1d22]/60 backdrop-blur-lg py-6 px-8 rounded-2xl shadow-2xl border border-gray-700/50">
                        <p className="font-bold text-blue-400 uppercase tracking-wider mb-3 text-sm">INDUSTRY</p>
                        <p className="font-semibold text-xl text-gray-200">{project.clientIndustry}</p>
                      </div>
                    )}
                    {project?.projectDuration && (
                      <div className="info-card text-center bg-[#1d1d22]/60 backdrop-blur-lg py-6 px-8 rounded-2xl shadow-2xl border border-gray-700/50">
                        <p className="font-bold text-blue-400 uppercase tracking-wider mb-3 text-sm">TIMELINE</p>
                        <p className="font-semibold text-xl text-gray-200">{project.projectDuration}</p>
                      </div>
                    )}
                    {project?.teamSize && (
                      <div className="info-card text-center bg-[#1d1d22]/60 backdrop-blur-lg py-6 px-8 rounded-2xl shadow-2xl border border-gray-700/50">
                        <p className="font-bold text-blue-400 uppercase tracking-wider mb-3 text-sm">TEAM</p>
                        <p className="font-semibold text-xl text-gray-200">{project.teamSize}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div 
                className="hero-image hero-image-container w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50 relative"
                onMouseEnter={(e) => handleImageHover(e, true)}
                onMouseLeave={(e) => handleImageHover(e, false)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                {project?.image && (
                  <Image
                    src={project.image}
                    width={1400}
                    height={800}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                    priority
                  />
                )}
                {project?.video && (
                  <video 
                    className="w-full h-auto object-cover" 
                    loop 
                    playsInline 
                    muted 
                    autoPlay
                    controls
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
            
            {/* Project Overview */}
            <div 
              ref={overviewRef}
              className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-32"
            >
              <div 
                className="overview-content bg-gradient-to-br from-[#1d1d22]/80 to-[#2a2a30]/80 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-gray-700/50 relative overflow-hidden"
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
                <div className="relative z-10">
                  <h2 className="text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Project Overview</h2>
                  <p className="text-2xl text-gray-300 leading-relaxed mb-16 font-light">
                    {project.description}
                  </p>
                  
                  {project?.demo && (
                    <div className="flex justify-center">
                      <Link 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                      >
                        <span className="text-lg">Visit Live Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* The Problem & Solution */}
            {project?.problem && (
              <div 
                ref={problemSolutionRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-32"
              >
                <div className="grid md:grid-cols-2 gap-12">
                  <div 
                    className="problem-card bg-gradient-to-br from-red-900/20 to-red-800/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-red-700/30 relative overflow-hidden"
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-8">
                        <div className="h-16 w-16 bg-red-900/30 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-red-400">The Problem</h2>
                      </div>
                      <p className="text-xl text-gray-300 leading-relaxed font-light">
                        {project.problem}
                      </p>
                    </div>
                  </div>
                  
                  <div 
                    className="solution-card bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-green-700/30 relative overflow-hidden"
                    onMouseEnter={(e) => handleCardHover(e, true)}
                    onMouseLeave={(e) => handleCardHover(e, false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-8">
                        <div className="h-16 w-16 bg-green-900/30 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                          <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h2 className="text-4xl font-bold text-green-400">The Results</h2>
                      </div>
                      <p className="text-xl text-gray-300 leading-relaxed font-light">
                        {project.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Key Features */}
            {project?.keyFeatures && (
              <div 
                ref={featuresRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-32"
              >
                <h2 className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Key Features</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {project.keyFeatures.map((feature, index) => (
                    <div 
                      key={index} 
                      className="feature-card bg-gradient-to-br from-[#1d1d22]/80 to-[#2a2a30]/80 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-gray-700/50 relative overflow-hidden group cursor-pointer"
                      onMouseEnter={(e) => handleCardHover(e, true)}
                      onMouseLeave={(e) => handleCardHover(e, false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
                      <div className="relative z-10">
                        <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Screenshots Gallery */}
            {project?.extraImages?.length > 0 && (
              <div 
                ref={galleryRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 mb-32"
              >
                <h2 className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {project.extraImages.map((img, index) => (
                    <div 
                      key={index} 
                      className="gallery-item rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 group cursor-pointer"
                      onMouseEnter={(e) => handleImageHover(e, true)}
                      onMouseLeave={(e) => handleImageHover(e, false)}
                    >
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                          src={img}
                          width={600}
                          height={400}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Technologies Used */}
            {project?.technologies && (
              <div 
                ref={techRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-32"
              >
                <h2 className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Technologies Used</h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="tech-tag px-10 py-5 bg-gradient-to-br from-[#2a2a30] to-[#2d2d35] text-blue-300 rounded-2xl font-semibold shadow-xl border border-blue-900/30 backdrop-blur-lg hover:border-blue-700/50 transition-all duration-300 cursor-pointer text-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* What Makes This Project Special */}
            {project?.specialFeatures && (
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-32">
                <div 
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl py-20 px-12 rounded-3xl shadow-2xl border border-purple-700/30 relative overflow-hidden"
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5"></div>
                  <div className="relative z-10">
                    <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">What Makes This Project Special</h2>
                    <p className="text-2xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto font-light">
                      {project.specialFeatures}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials */}
            {project?.testimonials?.length > 0 && (
              <div 
                ref={testimonialsRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-32"
              >
                <h2 className="text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Client Testimonials</h2>
                <div className="grid md:grid-cols-2 gap-10">
                  {project.testimonials.map((testimonial, index) => (
                    <div 
                      key={index}
                      className="testimonial-card bg-gradient-to-br from-[#1d1d22]/80 to-[#2a2a30]/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-700/50 relative overflow-hidden group"
                      onMouseEnter={(e) => handleCardHover(e, true)}
                      onMouseLeave={(e) => handleCardHover(e, false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="mb-8">
                          <svg className="h-12 w-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-3v-10h8.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3v-10h9z" />
                          </svg>
                        </div>
                        <p className="text-2xl text-gray-300 italic mb-10 leading-relaxed font-light">
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center">
                          <div className="h-14 w-14 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center mr-4">
                            <span className="text-xl font-bold text-blue-400">
                              {testimonial.author[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-xl text-blue-400">{testimonial.author}</p>
                            {testimonial.position && (
                              <p className="text-gray-400 mt-1">{testimonial.position}</p>
                            )}
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {/* Future Plans */}
            {project?.futurePlans && (
              <div 
                ref={futurePlansRef}
                className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-32"
              >
                <div 
                  className="future-plans-card bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-xl py-20 px-12 rounded-3xl shadow-2xl border border-cyan-700/30 relative overflow-hidden"
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-blue-600/5"></div>
                  <div className="relative z-10">
                    <h2 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">Future Plans</h2>
                    <p className="text-2xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto font-light">
                      {project.futurePlans}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div 
              ref={ctaRef}
              className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center mb-32"
            >
              <div 
                className="cta-content bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-16 shadow-2xl relative overflow-hidden group"
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h2 className="text-5xl font-bold mb-8 text-white">
                    Interested in working with us?
                  </h2>
                  <p className="text-2xl text-blue-100 mb-12 font-light">
                    Let's discuss how we can help bring your ideas to life.
                  </p>
                  <Link 
                    href="/contact" 
                    className="group inline-flex items-center px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 border border-white/20"
                  >
                    <span className="text-xl">Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </main>
  );
};

export default Index;