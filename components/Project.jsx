import { useEffect, useRef, useState } from "react";

// Enhanced SingleSplitText component with better animations
const SingleSplitText = ({ textBody, className, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      <div
        className={`transform transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {children}
        {textBody && (
          <p className="mt-2 text-sm opacity-75 transform transition-all duration-500 delay-300">
            {textBody}
          </p>
        )}
      </div>
    </div>
  );
};

// Enhanced ProjectCard component
export function ProjectCard(props) {
  const {
    title,
    description,
    image,
    vid,
    github,
    demo,
    className = "",
    textStyle = "",
    contStyle = "",
    textBody = "",
    gooyey = "",
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-transparent transition-all duration-700 hover:shadow-2xl md:rounded-3xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />
      </div>

      <div
        className={`relative z-10 h-[100%] flex w-[95%] rounded-2xl bg-transparent text-center md:bg-zinc-700/80 md:backdrop-blur-sm md:w-full flex-col border border-zinc-600/30 ${contStyle} transition-all duration-500 group-hover:bg-zinc-700/90 group-hover:border-zinc-500/50`}
      >
        <div className="flex items-center md:items-start flex-row p-4 md:p-6">
          <div className="flex items-start relative">
            <SingleSplitText textBody={textBody} className={`${textStyle}`}>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </h3>
            </SingleSplitText>
            {gooyey && (
              <div className="relative ml-2 transition-transform duration-300 group-hover:rotate-45">
                <svg
                  id="Layer_1"
                  className="w-[30px] rotate-[270deg] relative bottom-0 transition-all duration-300 group-hover:fill-blue-400"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="#03061c"
                    d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"
                    className="transition-all duration-300 group-hover:fill-blue-400"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced media container */}
        <div
          className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden"
          style={{ zIndex: -1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

          {vid ? (
            <video
              width="1280"
              height="720"
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out filter group-hover:brightness-110"
              autoPlay
              loop
              playsInline
              muted
            >
              <source src={vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            image && (
              <img
                src={image}
                width={300}
                height={300}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out filter group-hover:brightness-110"
              />
            )
          )}

          {/* Animated particles overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-500" />
          </div>
        </div>

        {/* Content overlay */}
        {description && (
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced TransitionLink component
const TransitionLink = ({
  href,
  children,
  trRef,
  loading,
  setLoading,
  linkStyle,
  className,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate page transition
    setTimeout(() => {
      setLoading(false);
      // In real app, you'd navigate here
      console.log(`Navigating to: ${href}`);
    }, 1500);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${linkStyle} block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}
    >
      {children}
    </a>
  );
};

// Enhanced Project component
function Project() {
  const [isHovered, setIsHovered] = useState(false);
  const trRef = useRef();
  const [loading, setLoading] = useState(false);

  // Sample works data
  const Works = [
    {
      title: "Neural Network Visualizer",
      description:
        "Interactive visualization of neural network architectures with real-time training data",
      textBody: "AI/ML • Visualization",
      className:
        "md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-900/20 to-purple-900/20",
      textStyle: "text-blue-400 font-bold",
      gooyey: true,
      slug: "neural-visualizer",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=400&fit=crop",
      linkStyle: "hover:shadow-blue-500/20",
    },
    {
      title: "3D Portfolio",
      textBody: "WebGL • Three.js",
      className:
        "md:col-span-2 bg-gradient-to-r from-green-900/20 to-teal-900/20",
      textStyle: "text-green-400 font-semibold",
      gooyey: false,
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with modern payment integration",
      textBody: "React • Node.js • Stripe",
      className:
        "md:col-span-2 md:row-span-2 bg-gradient-to-bl from-orange-900/20 to-red-900/20",
      textStyle: "text-orange-400 font-bold",
      gooyey: true,
      slug: "ecommerce-platform",
      video:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      linkStyle: "hover:shadow-orange-500/20",
    },
    {
      title: "Mobile App",
      textBody: "React Native • Firebase",
      className:
        "md:col-span-1 bg-gradient-to-t from-pink-900/20 to-purple-900/20",
      textStyle: "text-pink-400 font-medium",
      gooyey: false,
    },
    {
      title: "Data Dashboard",
      description:
        "Real-time analytics dashboard with interactive charts and metrics",
      textBody: "D3.js • Analytics",
      className:
        "md:col-span-1 bg-gradient-to-b from-cyan-900/20 to-blue-900/20",
      textStyle: "text-cyan-400 font-bold",
      gooyey: true,
      slug: "data-dashboard",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop",
      linkStyle: "hover:shadow-cyan-500/20",
    },
    {
      title: "Blockchain App",
      description:
        "Decentralized application built on Ethereum with smart contracts",
      textBody: "Web3 • Solidity • DeFi",
      className:
        "md:col-span-2 bg-gradient-to-r from-yellow-900/20 to-orange-900/20",
      textStyle: "text-yellow-400 font-bold",
      gooyey: true,
      slug: "blockchain-app",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=400&fit=crop",
      linkStyle: "hover:shadow-yellow-500/20",
    },
  ];

  return (
    <div className="bg-[#1e2235] flex items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24">
      {/* Large screens - Bento grid */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-10 gap-6 w-full max-h-screen max-w-7xl relative">
        <div className="rounded-3xl col-span-1 row-span-5 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card1.svg" alt="" className="w-full rounded-3xl" />
        </div>

        <div className="rounded-3xl col-span-2 row-span-5 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card2.svg" alt="" className="w-full rounded-3xl" />
        </div>
        
        <div className="rounded-3xl col-span-1 row-span-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card3.svg" alt="" className="w-full rounded-3xl" />
        </div>

        <div className="rounded-3xl col-span-1 row-span-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card4.svg" alt="" className="w-full rounded-3xl" />
        </div>
        
        <div className="rounded-3xl col-span-1 row-span-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card5.svg" alt="" className="w-full rounded-3xl" />
        </div>

        <div className="rounded-3xl col-span-1 row-span-5 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card7.svg" alt="" className="w-full rounded-3xl" />
        </div>
        
        <div className="rounded-3xl col-span-2 row-span-5 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card8.svg" alt="" className="w-full rounded-3xl" />
        </div>
        
        <div className="rounded-3xl col-span-1 row-span-2 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card6.svg" alt="" className="w-full rounded-3xl" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out pointer-events-auto cursor-pointer">
            <img src="/bento/circle.svg" alt="" className="w-full rounded-full animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Medium screens - Simplified grid */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 w-full max-w-3xl mx-auto">
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card1.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card2.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card3.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card4.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card5.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card6.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card7.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="rounded-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card8.svg" alt="" className="w-full rounded-2xl" />
        </div>
        
        <div className="col-span-2 flex justify-center my-4">
          <div className="w-[180px] h-[180px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">
            <img src="/bento/circle.svg" alt="" className="w-full rounded-full animate-spin-slow" />
          </div>
        </div>
      </div>
      
      {/* Small screens - Simple stacked */}
      <div className="flex flex-col gap-4 w-full md:hidden max-w-sm mx-auto">
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card1.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card2.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="flex justify-center my-4">
          <div className="w-[150px] h-[150px] rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">
            <img src="/bento/circle.svg" alt="" className="w-full rounded-full animate-spin-slow" />
          </div>
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card3.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card4.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card5.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card6.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card7.svg" alt="" className="w-full rounded-xl" />
        </div>
        
        <div className="rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
          <img src="/bento/card8.svg" alt="" className="w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default Project;
