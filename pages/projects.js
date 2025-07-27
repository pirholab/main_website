"use client"
import { useEffect, useRef, useState } from 'react';

import { Footer } from '@/components/Footer';
import Navbars from '@/components/Navbars';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle,
  ChevronDown,
  Clock,
  Code,
  ExternalLink, Filter,
  Globe,
  Monitor,
  Pause,
  Play,
  Search,
  Smartphone,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
const ProjectsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [isLoading, setIsLoading] = useState(false);

  // Comprehensive project data with more details
  const projects = [
    {
      id: 1,
      title: "Cover Page Generator",
      description: "AI-powered tool for creating professional document covers instantly with customizable templates and brand integration",
      image: "/cover-page-generator/banner.png",
      video: "/cover-page-generator/video.mp4",
      tags: ["Productivity", "PDF", "AI", "Design"],
      link: "#case-study",
      demoLink: "#demo",
      category: "Web App",
      status: "Live",
      year: 2024,
      duration: "3 months",
      team: 4,
      technologies: ["React", "Node.js", "AI/ML", "AWS"],
      features: ["AI-powered design", "Template library", "Brand integration", "PDF export"],
      metrics: {
        users: "10K+",
        rating: 4.8,
        performance: "99.9%"
      },
      client: "Enterprise Solutions Inc.",
      industry: "SaaS",
      challenge: "Automated professional document creation",
      results: "300% faster document creation, 95% user satisfaction"
    },
    {
      id: 2,
      title: "EduTracker Mobile App",
      description: "Comprehensive student management system with real-time analytics, progress tracking, and parent communication portal",
      image: "/api/placeholder/600/400",
      video: null,
      tags: ["Education", "Mobile", "Analytics", "Management"],
      link: "#case-study",
      demoLink: null,
      category: "Mobile App",
      status: "Live",
      year: 2024,
      duration: "6 months",
      team: 6,
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
      features: ["Real-time tracking", "Parent portal", "Analytics dashboard", "Offline sync"],
      metrics: {
        users: "25K+",
        rating: 4.9,
        performance: "99.5%"
      },
      client: "EduTech Solutions",
      industry: "Education",
      challenge: "Streamlined student-teacher-parent communication",
      results: "40% improvement in student engagement, 60% faster communication"
    },
    {
      id: 3,
      title: "E-commerce Analytics Dashboard",
      description: "Real-time business intelligence platform for online retailers with predictive analytics and automated reporting",
      image: "/api/placeholder/600/400",
      video: "/api/placeholder/600/400",
      tags: ["Analytics", "E-commerce", "Dashboard", "Business"],
      link: null,
      demoLink: "#demo",
      category: "Web Platform",
      status: "Beta",
      year: 2024,
      duration: "8 months",
      team: 8,
      technologies: ["Vue.js", "Python", "TensorFlow", "PostgreSQL"],
      features: ["Predictive analytics", "Custom reports", "Real-time data", "API integrations"],
      metrics: {
        users: "5K+",
        rating: 4.7,
        performance: "99.8%"
      },
      client: "RetailTech Corp",
      industry: "Retail",
      challenge: "Actionable insights from complex e-commerce data",
      results: "25% increase in sales conversion, 50% reduction in inventory waste"
    },
    {
      id: 4,
      title: "Task Management Suite",
      description: "Collaborative workspace for teams with advanced project tracking, time management, and productivity insights",
      image: "/api/placeholder/600/400",
      video: "/api/placeholder/600/400",
      tags: ["Productivity", "Collaboration", "Tools", "Management"],
      link: "#case-study",
      demoLink: "#demo",
      category: "Web App",
      status: "Live",
      year: 2023,
      duration: "5 months",
      team: 5,
      technologies: ["Angular", "Node.js", "Socket.io", "Redis"],
      features: ["Real-time collaboration", "Time tracking", "Advanced reporting", "Integrations"],
      metrics: {
        users: "15K+",
        rating: 4.6,
        performance: "99.7%"
      },
      client: "ProductivityFirst LLC",
      industry: "SaaS",
      challenge: "Seamless team collaboration and project visibility",
      results: "35% increase in team productivity, 90% user adoption rate"
    },
    {
      id: 5,
      title: "PDF Annotation Tool",
      description: "Smart document review system with AI-powered insights, collaborative annotations, and version control",
      image: "/api/placeholder/600/400",
      video: null,
      tags: ["PDF", "Productivity", "AI", "Collaboration"],
      link: "#case-study",
      demoLink: null,
      category: "Web App",
      status: "Live",
      year: 2023,
      duration: "4 months",
      team: 3,
      technologies: ["React", "PDF.js", "Python", "OpenAI"],
      features: ["AI insights", "Collaborative reviews", "Version control", "Smart search"],
      metrics: {
        users: "8K+",
        rating: 4.5,
        performance: "99.6%"
      },
      client: "LegalTech Innovations",
      industry: "Legal",
      challenge: "Efficient document review and collaboration",
      results: "60% faster document processing, 80% error reduction"
    },
    {
      id: 6,
      title: "Learning Management Portal",
      description: "Complete online education platform with interactive features, assessment tools, and progress analytics",
      image: "/api/placeholder/600/400",
      video: "/api/placeholder/600/400",
      tags: ["Education", "E-learning", "Platform", "Assessment"],
      link: "#case-study",
      demoLink: "#demo",
      category: "Web Platform",
      status: "Live",
      year: 2023,
      duration: "10 months",
      team: 10,
      technologies: ["Next.js", "Django", "WebRTC", "AWS"],
      features: ["Interactive courses", "Live sessions", "Assessment engine", "Certification"],
      metrics: {
        users: "50K+",
        rating: 4.9,
        performance: "99.9%"
      },
      client: "Global Education Network",
      industry: "Education",
      challenge: "Scalable online learning ecosystem",
      results: "200% increase in course completion, 95% student satisfaction"
    },
    {
      id: 7,
      title: "Social Media Analytics",
      description: "Cross-platform social media performance tracking and insights with automated reporting and competitor analysis",
      image: "/api/placeholder/600/400",
      video: null,
      tags: ["Analytics", "Social Media", "Tools", "Marketing"],
      link: null,
      demoLink: "#demo",
      category: "Web App",
      status: "Development",
      year: 2024,
      duration: "6 months",
      team: 7,
      technologies: ["React", "GraphQL", "Python", "Docker"],
      features: ["Multi-platform tracking", "Competitor analysis", "Automated reports", "Trend predictions"],
      metrics: {
        users: "Beta",
        rating: "N/A",
        performance: "Testing"
      },
      client: "MarketingPro Agency",
      industry: "Marketing",
      challenge: "Unified social media performance insights",
      results: "Expected: 45% improvement in campaign ROI"
    },
    {
      id: 8,
      title: "Invoice Generator Pro",
      description: "Professional invoicing solution with automated workflows, payment integration, and financial reporting",
      image: "/api/placeholder/600/400",
      video: "/api/placeholder/600/400",
      tags: ["Business", "PDF", "Tools", "Finance"],
      link: "#case-study",
      demoLink: null,
      category: "Web App",
      status: "Live",
      year: 2023,
      duration: "3 months",
      team: 4,
      technologies: ["Vue.js", "Laravel", "Stripe", "PDF.js"],
      features: ["Automated invoicing", "Payment processing", "Financial reports", "Tax calculations"],
      metrics: {
        users: "12K+",
        rating: 4.7,
        performance: "99.8%"
      },
      client: "FinanceFlow Solutions",
      industry: "Finance",
      challenge: "Streamlined invoicing and payment processing",
      results: "70% faster invoice processing, 50% reduction in payment delays"
    }
  ];

  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  const categories = ['All Categories', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All' || project.tags.includes(selectedFilter);
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return b.year - a.year;
      case 'oldest': return a.year - b.year;
      case 'rating': return (b.metrics.rating || 0) - (a.metrics.rating || 0);
      case 'users': return parseInt(b.metrics.users.replace(/\D/g, '') || '0') - parseInt(a.metrics.users.replace(/\D/g, '') || '0');
      default: return 0;
    }
  });
  
  const displayedProjects = sortedProjects.slice(0, visibleProjects);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
      setIsLoading(false);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Beta': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Development': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web App': return <Globe className="w-4 h-4" />;
      case 'Mobile App': return <Smartphone className="w-4 h-4" />;
      case 'Web Platform': return <Monitor className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (videoRef.current) {
        if (isHovered && project.video && videoPlaying) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    }, [isHovered, project.video, videoPlaying]);

    const handleVideoToggle = (e) => {
      e.stopPropagation();
      setVideoPlaying(!videoPlaying);
    };

    return (
      <div 
        className={`group relative bg-gray-900/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800/50 hover:border-purple-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20 ${
          viewMode === 'grid' ? 'hover:-translate-y-3' : 'hover:-translate-y-1'
        } ${showDetails ? 'col-span-full' : ''}`}
        style={{
          animationDelay: `${index * 100}ms`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced accent shapes */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-orange-500/30 rounded-full blur-2xl group-hover:from-purple-500/50 group-hover:to-orange-500/50 transition-all duration-700"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-700"></div>
        <div className="absolute top-1/2 right-0 w-16 h-16 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-lg"></div>

        {/* Status indicator */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Media container */}
        <div className="relative h-auto overflow-hidden bg-gray-800/50">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
          />
          
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered && videoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          
          {/* Enhanced overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/80">
                  {getCategoryIcon(project.category)}
                  <span className="text-sm font-medium">{project.category}</span>
                </div>
                {project.video && (
                  <button
                    onClick={handleVideoToggle}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    {videoPlaying ? (
                      <Pause className="w-4 h-4 text-white" fill="white" />
                    ) : (
                      <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced content */}
        <div className="p-6 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={tag}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-purple-300 border-purple-500/30' 
                    : 'bg-gray-800/50 text-gray-400 border-gray-700/50 group-hover:border-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium bg-gray-800/30 text-gray-500 rounded-full border border-gray-700/50">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Title and description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-500">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
              {project.description}
            </p>
          </div>

          {/* Project stats */}
          <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-800/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                <Users className="w-3 h-3" />
                <span className="text-xs font-semibold">{project.metrics.users}</span>
              </div>
              <div className="text-xs text-gray-500">Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <Star className="w-3 h-3" fill="currentColor" />
                <span className="text-xs font-semibold">{project.metrics.rating || 'N/A'}</span>
              </div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs font-semibold">{project.metrics.performance}</span>
              </div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Code className="w-3 h-3" />
              <span>Built with:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map(tech => (
                <span 
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-800/60 text-gray-300 rounded border border-gray-700/50 group-hover:bg-gray-800 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {project.link && (
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                View Case Study
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
            
            {project.demoLink && (
              <button className="flex-1 px-4 py-3 bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-semibold rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5">
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
            
            {!project.link && !project.demoLink && (
              <div className="flex-1 px-4 py-3 bg-gray-800/30 text-gray-500 text-sm font-semibold rounded-xl border border-gray-800/50 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Coming Soon
              </div>
            )}
          </div>

          {/* View details button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full mt-3 px-4 py-2 text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {showDetails ? 'Less Details' : 'More Details'}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} />
          </button>

          {/* Expanded details */}
          {showDetails && (
            <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Client:</span>
                  <p className="text-white font-medium">{project.client}</p>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <p className="text-white font-medium">{project.duration}</p>
                </div>
                <div>
                  <span className="text-gray-400">Team Size:</span>
                  <p className="text-white font-medium">{project.team} members</p>
                </div>
                <div>
                  <span className="text-gray-400">Industry:</span>
                  <p className="text-white font-medium">{project.industry}</p>
                </div>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">Key Features:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.features.map(feature => (
                    <span key={feature} className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded border border-purple-500/30">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">Challenge:</span>
                <p className="text-white text-sm mt-1">{project.challenge}</p>
              </div>
              
              <div>
                <span className="text-gray-400 text-sm">Results:</span>
                <p className="text-green-400 text-sm mt-1 font-medium">{project.results}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-[100px] min-h-screen bg-gray-950 relative overflow-hidden">
      <Navbars/>
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-gradient-to-l from-orange-500/15 to-purple-500/15 rounded-full blur-2xl"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Enhanced header */}
      <div className="relative z-10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Title section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-medium mb-4">
              <Award className="w-3 h-3" />
              Our Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Featured{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 via-purple-300 to-orange-400 bg-clip-text relative">
                Projects
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-30"></div>
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Explore our comprehensive collection of mobile & web applications—each designed for real-world impact, 
              built with cutting-edge technology.
            </p>
          </div>
          
          {/* Stats bar */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-6 py-4 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-0.5">{projects.length}+</div>
                <div className="text-gray-400 text-xs">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-0.5">100K+</div>
                <div className="text-gray-400 text-xs">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-0.5">4.8</div>
                <div className="text-gray-400 text-xs">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-0.5">99.7%</div>
                <div className="text-gray-400 text-xs">Uptime</div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-800/50 p-5">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, technologies, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none text-sm"
                />
              </div>
              
              {/* Sort */}
              <div className="md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-3 text-white focus:border-purple-500/50 focus:outline-none text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="users">Most Users</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Filter tags */}
            <div className="mt-4 pt-4 border-t border-gray-800/30">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 text-gray-400 mr-1">
                  <Filter className="w-3 h-3" />
                  <span className="text-xs font-medium">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedFilter(tag);
                        setVisibleProjects(6);
                      }}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                        selectedFilter === tag
                          ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700/50'
                      }`}
                    >
                      {tag}
                      {selectedFilter === tag && <span className="ml-1">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results info */}
          <div className="flex justify-between items-center mt-4 mb-8 px-1">
            <div className="text-sm text-gray-400">
              Showing <span className="text-white font-semibold">{displayedProjects.length}</span> of{' '}
              <span className="text-white font-semibold">{filteredProjects.length}</span> projects
              {searchTerm && (
                <span className="ml-1">
                  for "<span className="text-purple-400">{searchTerm}</span>"
                </span>
              )}
            </div>
            
            {/* View mode toggle */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced projects grid */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No projects found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('All');
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Enhanced Load more / View all */}
          {visibleProjects < filteredProjects.length && (
            <div className="text-center space-y-4">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-purple-600/20 to-orange-600/20 hover:from-purple-600/30 hover:to-orange-600/30 text-white font-semibold rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                    Loading Projects...
                  </>
                ) : (
                  <>
                    Load More Projects
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-gray-400 text-sm">
                {filteredProjects.length - visibleProjects} more projects available
              </p>
            </div>
          )}
          
          {visibleProjects >= filteredProjects.length && filteredProjects.length > 6 && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-10 py-4 bg-gray-800/30 text-gray-400 font-semibold rounded-2xl border border-gray-700">
                <CheckCircle className="w-5 h-5 text-green-400" />
                All projects loaded ({filteredProjects.length} total)
              </div>
              <p className="text-gray-500 text-sm">
                You've seen all available projects in this category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Call to action section */}
      <div className="relative z-10 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-purple-900/30 to-orange-900/30 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-orange-500/10"></div>
            <div className="relative p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Have a Project in Mind?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's collaborate to bring your vision to life with cutting-edge technology 
                and exceptional design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                  Start a Project
                </button>
                <button className="px-8 py-4 bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-24"></div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;