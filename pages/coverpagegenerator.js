import { ArrowRight, Check, Download, FileText, Printer, Save, Share2, Sparkles, Star, Trophy, Users } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaGooglePlay } from 'react-icons/fa';

const CoverPageGenerator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: FileText,
      title: "University Templates",
      description: "Generate cover pages for assignments and lab reports for various universities in Bangladesh.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Save,
      title: "Smart Save System",
      description: "Save your input values for future use, making it faster to create new cover pages.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Download,
      title: "Instant PDF Export",
      description: "Download your generated cover page as a high-quality PDF document with custom file names.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Share2,
      title: "Direct Sharing",
      description: "Share your generated cover page directly with others through various apps.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Printer,
      title: "One-Tap Printing",
      description: "Print your cover page directly from the app with just one tap.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { icon: Users, value: "9K+", label: "Downloads", color: "text-emerald-400" },
    { icon: Star, value: "5.0", label: "Rating", color: "text-yellow-400" },
    { icon: Trophy, value: "#1", label: "In Bangladesh", color: "text-blue-400" }
  ];

  const screenshots = [
    { id: 1, src: "/cover-page-generator/cover1.png", delay: "0ms" },
    { id: 2, src: "/cover-page-generator/cover2.png", delay: "100ms" },
    { id: 3, src: "/cover-page-generator/cover3.webp", delay: "200ms" },
    { id: 4, src: "/cover-page-generator/cover4.png", delay: "300ms" }
  ];

  const faqs = [
    {
      question: "What is Cover Page Generator?",
      answer: "Cover Page Generator is a mobile application that helps students create professional cover pages for assignments and lab reports for universities in Bangladesh."
    },
    {
      question: "How many downloads does the app have?",
      answer: "The app has been downloaded over 9,000 times from the Google Play Store."
    },
    {
      question: "Can I save my information for future use?",
      answer: "Yes, the app allows you to save your input values so you don't have to re-enter them every time you create a new cover page."
    },
    {
      question: "What options do I have after creating a cover page?",
      answer: "You can download the cover page as a PDF, rename it, share it directly, or print it."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>Cover Page Generator - PDF | PiRhoTech</title>
        <meta
          name="description"
          content="Generate professional cover pages for assignments and lab reports for universities in Bangladesh. Over 9,000 downloads on Google Play Store."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon.ico" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta property="og:title" content="Cover Page Generator - PiRhoTech" />
        <meta
          property="og:description"
          content="Generate professional cover pages for assignments and lab reports for universities in Bangladesh."
        />
        <meta property="og:image" content="/cover-page-generator/cover1.png" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#007d7c] to-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-lg flex items-center justify-center">
                <img className="h-8" src="/cover-page-logo.svg" alt="Cover Page Generator Logo"  />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#007d7c] to-cyan-400 bg-clip-text text-transparent">
                Cover Page Generator
              </span>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-full hover:from-[#006665] hover:to-cyan-600 transition-all duration-300 flex items-center space-x-2 group"
            >
              <FaGooglePlay className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Download</span>
            </a>
          </div>
        </div>
      </nav>

      

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#007d7c]/20 to-cyan-500/20 px-4 py-2 rounded-full border border-[#007d7c]/30">
                  <Sparkles className="w-5 h-5 text-[#007d7c]" />
                  <span className="text-sm font-medium text-[#007d7c]">9,000+ Downloads</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  Create
                  <span className="block bg-gradient-to-r from-[#007d7c] via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Professional
                  </span>
                  Cover Pages
                </h1>
                
                <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                  Generate stunning cover pages for your assignments and lab reports in seconds. 
                  Built specifically for university students in Bangladesh.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-2xl hover:from-[#006665] hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#007d7c]/25"
                >
                  <FaGooglePlay className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-lg">Download on Play Store</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center space-x-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <span className="text-sm text-slate-400">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                {/* Phone Mockup */}
                <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#007d7c]/10 to-cyan-500/10"></div>
                    <div className="relative z-10 p-8 flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                      <img className="h-10" src="/cover-page-logo.svg" alt="Cover Page Generator Logo"  />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Cover Page Generator</h3>
                      <p className="text-slate-600 text-center mb-8">Professional cover pages in seconds</p>
                      
                      <div className="space-y-4 w-full">
                        <div className="bg-gradient-to-r from-[#007d7c]/20 to-cyan-500/20 p-4 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-[#007d7c]" />
                            <span className="text-slate-700">University Templates</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-green-600" />
                            <span className="text-slate-700">PDF Export</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Check className="w-5 h-5 text-purple-600" />
                            <span className="text-slate-700">Direct Sharing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to create professional cover pages quickly and efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/80 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{animationDelay: `${index * 100}ms`}}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#007d7c] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Take a look at the intuitive interface and beautiful output
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className={`relative group transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{transitionDelay: screenshot.delay}}
              >
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 group-hover:bg-slate-800/80 transition-all duration-300">
                  <div className="aspect-[9/16] rounded-xl overflow-hidden relative">
                    <Image
                      src={screenshot.src}
                      alt={`Cover Page Generator Screenshot ${screenshot.id}`}
                      fill
                      style={{ objectFit: "contain" }}
                      className="transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#007d7c] to-cyan-500 opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#007d7c]/20 to-cyan-500/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join over 9,000 students who are already creating professional cover pages effortlessly
          </p>
          
          <a
            href="https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-2xl hover:from-[#006665] hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#007d7c]/25 text-xl font-bold"
          >
            <FaGooglePlay className="w-8 h-8 mr-4 group-hover:scale-110 transition-transform" />
            Download Now - It's Free!
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Banner Image Section */}
      <section className="relative pt-28 ">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div className="relative aspect-[21/9] w-full">
              <img
                src="/cover-page-generator/banner.png"
                alt="Cover Page Generator"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 text-[#007d7c]">
                  {faq.question}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-[#007d7c] to-cyan-500 rounded-lg flex items-center justify-center">
            <img className="h-5" src="/cover-page-logo.svg" alt="Cover Page Generator Logo"  />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#007d7c] to-cyan-400 bg-clip-text text-transparent">
              Cover Page Generator
            </span>
          </div>
          <p className="text-slate-400">
            © 2025 PiRhoTech. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default CoverPageGenerator;