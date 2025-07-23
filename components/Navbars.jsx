"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

// Mock components for dependencies
const Button = ({ href, className, children, ...props }) => (
  <a 
    href={href} 
    className={`relative p-[2px] rounded-[40px] bg-gradient-to-r from-[#FFB266] to-[#D96263] transition-all duration-300 hover:scale-105 ${className}`}
    {...props}
  >
    <div className="flex h-full w-full items-center justify-center rounded-[38px] bg-[#2b3254] px-6 py-2 text-xl font-medium">
      <span className="relative z-10">{children}</span>
    </div>
  </a>
);

const TransitionLink = ({ href, className, children, onClick, ...props }) => (
  <a 
    href={href} 
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </a>
);

// Hamburger menu component with glass effect
const Hamburger = ({ size, toggled, toggle, color }) => (
  <button
    onClick={() => toggle(!toggled)}
    className="relative w-10 h-10 flex flex-col justify-center items-center space-y-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110"
    aria-label={toggled ? "Close menu" : "Open menu"}
  >
    <span 
      className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
        toggled ? 'rotate-45 translate-y-1.5' : ''
      }`}
      style={{ color }}
    />
    <span 
      className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
        toggled ? 'opacity-0' : ''
      }`}
      style={{ color }}
    />
    <span 
      className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
        toggled ? '-rotate-45 -translate-y-1.5' : ''
      }`}
      style={{ color }}
    />
  </button>
);

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home", useTransition: true },
  { href: "/projects", label: "Projects", useTransition: true },
  { href: "/about", label: "About", useTransition: true },
  { href: "/blog", label: "Blog", useTransition: true },
  { href: "/contact", label: "Contact", useTransition: true },
];

const LiquidGlassNavbar = ({ loading = false, setLoading = () => {}, trRef = null }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navbarRef = useRef(null);
  const linksRef = useRef(null);

  // Handle mouse movement for liquid effect
  const handleMouseMove = useCallback((e) => {
    if (navbarRef.current) {
      const rect = navbarRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  // Control navbar visibility on scroll
  const controlNavbar = useCallback(() => {
    if (isMenuOpen) return;
    
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMenuOpen]);

  // Setup event listeners
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(controlNavbar);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controlNavbar]);

  // Handle menu animations and body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      
      if (linksRef.current) {
        linksRef.current.style.opacity = "1";
        linksRef.current.style.transform = "translateY(0)";
      }
    } else {
      document.body.style.overflow = "unset";
      
      if (linksRef.current) {
        linksRef.current.style.opacity = "0";
        linksRef.current.style.transform = "translateY(-20px)";
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleMenuItemClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const renderNavItem = (item, className = "", isMobileMenu = false) => {
    const baseClassName = `relative group transition-all duration-300 hover:text-white ${className}`;
    
    const linkContent = (
      <span className="relative z-10">
        {item.label}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
      </span>
    );

    if (item.useTransition) {
      return (
        <TransitionLink
          key={item.href}
          href={item.href}
          className={baseClassName}
          onClick={isMobileMenu ? handleMenuItemClick : undefined}
        >
          {linkContent}
        </TransitionLink>
      );
    }
    
    return (
      <a
        key={item.href}
        href={item.href}
        className={baseClassName}
        onClick={isMobileMenu ? handleMenuItemClick : undefined}
      >
        {linkContent}
      </a>
    );
  };

  return (
    <>
      {/* Liquid Glass Navbar */}
      <nav
        ref={navbarRef}
        onMouseMove={handleMouseMove}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${
          isScrolled ? 'w-[90%] max-w-6xl' : 'w-[95%] max-w-7xl'
        }`}
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              transparent 100%),
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              rgba(255, 255, 255, 0.05) 50%, 
              rgba(255, 255, 255, 0.02) 100%)
          `,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '24px',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div 
            className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"
            style={{
              left: `${mousePosition.x * 0.5}%`,
              top: `${mousePosition.y * 0.3}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.3s ease-out',
            }}
          ></div>
          <div 
            className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"
            style={{
              right: `${(100 - mousePosition.x) * 0.4}%`,
              bottom: `${(100 - mousePosition.y) * 0.2}%`,
              transform: 'translate(50%, 50%)',
              transition: 'all 0.4s ease-out',
              animationDelay: '0.5s',
            }}
          ></div>
        </div>

        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <TransitionLink
                href="/"
                className="text-white flex items-center gap-3 font-bold text-xl hover:opacity-90 transition-all duration-300 group"
              >
                <div className="relative">
                  <img src="/pirhotech/logo.png" alt="PiRhoTech Logo" className="w-12 h-12" />
                </div>
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  PiRhoTech
                </span>
              </TransitionLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) =>
                renderNavItem(item, "text-white/80 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300")
              )}
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Button 
                href="/contact" 
                className="hidden lg:block"
              >
                Get Started
              </Button>

              {/* Mobile Menu Toggle */}
              <div className="block md:hidden">
                <Hamburger
                  size={20}
                  toggled={isMenuOpen}
                  toggle={setIsMenuOpen}
                  color="white"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div 
            className="fixed top-20 left-4 right-4 rounded-3xl overflow-hidden"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.15) 0%, 
                  rgba(255, 255, 255, 0.08) 50%, 
                  rgba(255, 255, 255, 0.05) 100%)
              `,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
            }}
          >
            <div
              ref={linksRef}
              className="px-6 py-8 space-y-6 transition-all duration-300"
              style={{
                opacity: "0",
                transform: "translateY(-20px)",
              }}
            >
              {NAVIGATION_ITEMS.map((item) =>
                renderNavItem(item, "block text-white/90 hover:text-white text-2xl font-medium py-3 hover:bg-white/5 rounded-lg px-4 transition-all duration-300", true)
              )}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-white/10">
                <Button href="/contact" className="w-full text-center justify-center">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiquidGlassNavbar;