// Function to convert title into a slug
function createSlug(title) {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
}

const Works = [
  {
    title: "Our Works",
    className:
      "flex md:row-span-1 md:col-start-1 md:col-end-3 justify-center items-center",
    textStyle:
      "text-white text-gray-900 leading-[0.8] text-center text-[3.5rem] dm:text-[4rem] lg:text-start lg:text-[5rem]",
    contStyle: "justify-center",
    textBody: "justify-center p-3 leading-[1]",
    description:
      "A comprehensive showcase of our most impactful and innovative projects, spanning a diverse range of industries including education, sports, e-commerce, crypto trading, and branding. Each project in this collection highlights our commitment to solving real-world problems with cutting-edge technology, creative design, and a user-centric approach. Our works reflect not only technical excellence but also a deep understanding of the unique challenges faced by our clients and users. Dive into each case study to discover the story, the challenges we overcame, the solutions we engineered, and the tangible impact we delivered.",
    image: null,
    github: null,
    demo: null,
    extraImages: [],
    tags: [],
    gooyey: null,
    trRef: null,
    loading: null,
    setLoading: null,
    linkStyle: null,
  },
  {
    title: "Cover Page Generator",
    description:
      "A mobile application that helps students create professional cover pages for assignments and lab reports for universities in Bangladesh. With over 9,000 downloads and a 5-star rating, it's become the go-to tool for students across the country. The app provides a seamless, step-by-step interface that guides users through the process of entering their academic details, selecting from a wide range of university-specific templates, and generating perfectly formatted cover pages in PDF format. It supports direct sharing, printing, and persistent storage of frequently used information, making it an indispensable tool for students aiming for academic excellence. The app's success is a testament to its user-friendly design, robust feature set, and its ability to address a highly localized but widespread problem in the Bangladeshi education system.",
    overview:
      "Cover Page Generator is a mobile application designed to simplify the creation of professional academic cover pages for university students in Bangladesh. It eliminates the tedious formatting process and offers a streamlined, user-friendly solution for generating standardized cover pages for assignments, lab reports, and other academic submissions. The app features a real-time preview, customizable templates for different universities and departments, and a lightweight PDF generation engine optimized for mobile devices. Its secure local storage system remembers user inputs without requiring accounts, ensuring both convenience and privacy. Since its launch, the app has saved students countless hours and has been recommended by educators across the country.",
    image: "/cover-page-generator/banner.png",
    // github: "https://github.com",
    demo: "https://pirhotech.com/coverpagegenerator",
    className:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/cover-page-generator/cover1.png",
      "/cover-page-generator/cover2.png",
      "/cover-page-generator/cover3.webp",
      "/cover-page-generator/cover4.png",
    ],
    tags: ["Productivity", "Education", "PDF Generation", "Academic Tools"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",

    // Case Study Content
    clientName: "University Students in Bangladesh",
    clientIndustry: "Education",
    projectDuration: "3 months",
    teamSize: "4 developers",

    // The Problem
    problem:
      "University students in Bangladesh spend an excessive amount of time creating cover pages for their assignments and lab reports. Each university has specific formatting requirements, and students often struggle with creating professional-looking cover pages. This results in lost productivity, inconsistent submissions, and academic penalties for incorrect formatting.",

    // Challenges
    challenges: [
      "Creating a user interface that's intuitive enough for students with varying levels of technical proficiency",
      "Supporting multiple university formats and requirements in a single application",
      "Implementing efficient PDF generation on mobile devices with limited resources",
      "Ensuring data persistence for frequently used information while maintaining privacy",
      "Optimizing the app size while maintaining high-quality output",
    ],

    // Solutions
    solutions: [
      "Designed a step-by-step form interface with real-time preview for immediate visual feedback",
      "Created a template system that supports customization for different universities and departments",
      "Implemented a lightweight PDF generation engine optimized for mobile devices",
      "Developed a secure local storage system that remembers user inputs without requiring accounts",
      "Integrated direct sharing and printing functionality to streamline workflow",
    ],

    // Results and Impact
    results:
      "Since its launch, Cover Page Generator has been downloaded over 9,000 times and maintains a perfect 5-star rating. Students report saving an average of 15-20 minutes per assignment submission. The app is now recommended by teaching assistants and professors at several major universities in Bangladesh.",

    // Key Features
    keyFeatures: [
      "Template library for major universities in Bangladesh",
      "Customizable fields for student information, course details, and submission specifics",
      "Real-time preview of the generated cover page",
      "One-click PDF export with custom file naming",
      "Direct sharing to email, messaging apps, and cloud storage",
      "Integrated printing functionality",
      "Input memory for frequently used information",
    ],

    // Technologies Used
    technologies: [
      "Flutter for cross-platform development",
      "Dart programming language",
      "PDF rendering libraries",
      "SQLite for local data storage",
      "Material Design components",
    ],

    // What Makes This Project Special
    specialFeatures:
      "Cover Page Generator stands out because it solves a specific, localized problem that was overlooked by larger educational technology companies. By focusing exclusively on the needs of Bangladeshi university students, we created a tool that perfectly fits their workflow and academic requirements. The app's success demonstrates how targeted solutions can make a significant impact on daily productivity.",

    // Testimonials
    testimonials: [
      {
        quote:
          "This app saved me so much time during finals week. I used to spend at least 15 minutes making cover pages for each assignment!",
        author: "BUET Student",
      },
      {
        quote:
          "My department is very strict about formatting. This app has all the templates I need and they're always perfect.",
        author: "DU Engineering Student",
      },
    ],

    // Future Plans
    futurePlans:
      "We're planning to expand the app with more templates for additional universities, integration with popular learning management systems, and potentially developing an iOS version based on user demand.",
  },
  {
    title: "Kormi Koi - Find Trusted Service Providers",
    description:
      "Kormi Koi is a real-time, AI-integrated labor management mobile platform designed to connect service seekers with skilled professionals like electricians, plumbers, and more across Bangladesh. With a secure KYC system, real-time job bidding, live chat, and location tracking, it solves core inefficiencies in the informal labor market. Whether you need emergency repairs or planned work, Kormi Koi ensures access to verified workers, transparent pricing, and a smooth hiring experience. Built for scale and trust, it's transforming the way people find and offer services.",

    overview:
      "Kormi Koi addresses critical challenges in the service industry by offering a user-friendly, tech-driven platform where service seekers and providers interact directly. Job seekers can post detailed requests, compare bids, and select verified professionals based on ratings and profiles. Meanwhile, service providers showcase their expertise, apply for jobs, communicate in real-time, and receive payments—all within a secure and transparent system. With features like role-based access control, location-based matching, and KYC verification, Kormi Koi is making labor access equitable and efficient.",

    image: "/kormikoi/banner.png",
    demo: "https://pirhotech.com/kormikoi", // Replace with actual link
    className:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/kormikoi/img1.jpg",
      "/kormikoi/img2.jpg",
      "/kormikoi/img3.jpg",
      "/kormikoi/img4.jpg",
      "/kormikoi/img5.jpg",
      "/kormikoi/img6.jpg",
      "/kormikoi/img7.jpg",
      "/kormikoi/img8.jpg",
    ],
    tags: ["Service", "Marketplace", "Workforce", "Real-Time", "Bidding"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",

    // Case Study Content
    clientName: "General Public and Skilled Workers in Bangladesh",
    clientIndustry: "Service Marketplace & Informal Labor",
    projectDuration: "5 months",
    teamSize: "4 developers, 1 UI/UX designer",

    // The Problem
    problem:
      "Bangladesh’s labor market lacks a trusted digital platform to connect skilled workers with job opportunities. For service seekers, finding reliable professionals is time-consuming and informal. For workers, there's limited visibility, pricing transparency, and consistent work opportunities.",

    // Challenges
    challenges: [
      "Designing an intuitive UI for users with varying tech literacy",
      "Enabling secure real-time chat and calls between users and workers",
      "Implementing KYC verification using NID and facial recognition",
      "Building a competitive bidding system while maintaining fairness",
      "Ensuring smooth geolocation and service-matching for real-time job tracking",
    ],

    // Solutions
    solutions: [
      "Developed a mobile-first interface with clear flows for posting and bidding jobs",
      "Integrated WebSocket-based chat, voice, and file sharing",
      "Used Google ML Kit for KYC verification with OCR and facial recognition",
      "Implemented a transparent bidding system and user rating mechanism",
      "Built geolocation-based matching with live tracking and ETA calculations",
    ],

    // Results and Impact
    results:
      "Kormi Koi successfully launched its beta with over 96% test case success rate. Early users praised its KYC and job-posting features. The platform empowers workers by giving them digital presence and enables customers to confidently hire based on skills, ratings, and verified identity.",

    // Key Features
    keyFeatures: [
      "Job posting with category, budget, deadline, and location",
      "Service provider bidding system",
      "Real-time chat, audio calls, and image sharing",
      "KYC verification with NID and face match",
      "Role-based dashboards for customers and workers",
      "Ratings and reviews after each job",
      "Location-based job discovery and progress tracking",
      "Secure in-app payment with SSLCommerz",
    ],

    // Technologies Used
    technologies: [
      "Flutter (Android front-end)",
      "Node.js + Express.js for backend APIs",
      "MongoDB and PostgreSQL for database",
      "WebSockets for real-time communication",
      "Google ML Kit for OCR and face detection",
      "JWT for secure authentication",
      "Google Maps API for location services",
    ],

    // What Makes This Project Special
    specialFeatures:
      "Unlike general freelancer platforms, Kormi Koi focuses on hyperlocal, blue-collar services in Bangladesh. Its unique integration of AI-based verification, bidding, real-time communication, and tracking makes it a holistic workforce management system tailored for developing markets.",

    // Testimonials
    testimonials: [
      {
        quote:
          "I used to rely on referrals and still get scammed. Kormi Koi connected me with a verified electrician in just 10 minutes.",
        author: "Homeowner, Mohammadpur",
      },
      {
        quote:
          "Now I get 3–4 job requests a week directly. My income has grown, and people trust me more because of KYC.",
        author: "Certified AC Mechanic, Dhaka",
      },
    ],

    // Future Plans
    futurePlans:
      "Plans include expanding to rural regions, adding voice assistant support for illiterate users, skill validation with certificates, AI-based matching algorithm improvements, and a full-featured iOS app. We’ll also launch loyalty rewards and referral bonuses for users and workers.",
  },

  {
    title: "NanoScan: PDF Scanner & Tools",
    description:
      "NanoScan is a privacy-first mobile application designed to simplify academic and professional document preparation. It enables users—especially university students in Bangladesh—to generate cover pages, scan documents, and convert images to PDFs, all within one streamlined, ad-free experience. With built-in university-specific templates and a powerful offline engine, NanoScan is the go-to app for students and professionals who value privacy, speed, and precision. Its completely offline functionality and no-login policy make it uniquely positioned for secure document processing in both academic and professional environments.",

    overview:
      "NanoScan offers a complete document toolkit that integrates a Cover Page Generator tailored for Bangladeshi universities, along with scanning, PDF merging, and export features. It removes the need for separate tools by combining everything into a fast, reliable, offline-first Android app. Designed for efficiency and student needs, the app provides a real-time form preview, persistent input memory, and customizable A4-sized PDFs ready for submission or sharing. From students preparing assignments to office workers creating formal documents, NanoScan delivers.",

    image: "/nanoscan/banner.png",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.pirhoscanner",
    className:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://play-lh.googleusercontent.com/js0rRFw_-qqlxu5cD3gJmPyki24LPMaxxzKSGW0d5rjz5AGdlN3TXtTAW9qzatjTRg=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/cVGVEnkyj_TJIwCv6gq4HPi0bEL_cd6BlK7gX8n80FP4qKEzs55t94xo-W-_bFAyCA=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/flWD5qcWXl-g-Y5OFatYuS-v_Nb4vpI2OBZGULEbZw5XOLTlliL30gIO2BZirGjZCIl5=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/nWh8Fkei4y1RJB7_UKJfc3BgP9PP9AstyMr1V9iUd8tQloPbbFqCNaIJ3ObKlQiaNg=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/jHMNovmGIRDpbZjotVfHNK4ps3J_6k-0KThP7yWrLkjJWr_EeajOQbrSseLfIHjP-Q=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/WCtDb3kYvr_cEPKKqXHSzA2NPlB668phaKk_81aAQdMuP-0viEZLRe4yfz9CoiwMRfY=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/-BgvdjLkMh7tXaIZTShjl-txaTwMIgmYpNBLceuWlPMmg4hFPbTQDs-iQKm-bDoxeBxS=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/XM7A1srJofHsJA2piUIZUKKcCHEcHC5Up7hAcIkbn3d1u79hupgRNRCIxxAo0lQqpQ=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/ij_15I5DN9I8jz2fVG14_4vTgx0seqEFC7bHOcCBQul9kZEAaWCNdwqYwF9VcSY8UA=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/xjMAx4GHJJNRuTuVpchQJvb3O5H8dbGwp9v2-kPn0Whh9eNpJ-pvVQGdti_JJO_L6B8=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/5VsIc4GOskvrYkuIWD3BAJRMIUlnTaft8EW6sI5Wn9CjRYaSmHpqHO5Clokpffym4g=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/gM-ZtBp6MxAfFwnT-93oEduYYUPK1swzA5Vy_uRhkNM2NywYNokbQI5Y1uN0gG9wk4c=w2560-h1440-rw",
      "https://play-lh.googleusercontent.com/0LotTcqvF6n68nKtn2FK7Blfop-5VGwZzeRhAb2IhwhCgLTd1QcCdHm5cEKIOjqQ6wk=w2560-h1440-rw",
    ],
    tags: ["Productivity", "PDF", "Scanner", "Education", "Document Tools"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",

    // Case Study Content
    clientName: "University Students & Professionals in Bangladesh",
    clientIndustry: "Education & Productivity",
    projectDuration: "2.5 months",
    teamSize: "3 developers + 1 designer",

    // The Problem
    problem:
      "Students and professionals in Bangladesh face difficulties generating properly formatted cover pages and scanned PDFs quickly. They often need multiple apps, which are slow, intrusive, or require internet access and accounts—creating workflow disruptions, privacy concerns, and inefficiencies.",

    // Challenges
    challenges: [
      "Designing a clean and offline-first user experience",
      "Supporting multiple cover page formats for Bangladeshi universities",
      "Building an accurate and fast image-to-PDF engine for mobile",
      "Ensuring the app works smoothly without login or network connection",
      "Maintaining small app size while including powerful features",
    ],

    // Solutions
    solutions: [
      "Built a form-based Cover Page Generator with preview and real-time updates",
      "Integrated university and department-specific templates with logos and formatting",
      "Developed an image-to-PDF converter using native Android capabilities and Flutter plugins",
      "Stored user inputs locally using SQLite for fast reuse, all while keeping user data offline",
      "Included dark mode, A4 format support, and one-tap export features for polished results",
    ],

    // Results and Impact
    results:
      "NanoScan launched in June 2025 and quickly gained a small but dedicated user base. While it has 10+ downloads so far, early feedback is positive, especially among students who appreciate the fast, no-login approach. The app is ad-free, secure, and respected for its niche focus on student needs.",

    // Key Features
    keyFeatures: [
      "Cover Page Generator with university-specific templates",
      "Image-to-PDF conversion",
      "Document scanning and automatic resizing",
      "PDF merging and one-click export",
      "Input memory for name, ID, course info, etc.",
      "Offline-first (no login, no data tracking)",
      "Dark mode support and A4 output formatting",
    ],

    // Technologies Used
    technologies: [
      "Flutter for Android development",
      "Dart programming language",
      "Android Camera and File APIs",
      "SQLite for local persistence",
      "PDF libraries for generation and preview",
    ],

    // What Makes This Project Special
    specialFeatures:
      "NanoScan fills a gap left by generic scanner apps by focusing on Bangladeshi students and offline security. It doesn’t just scan—it provides academic tools that respect student workflows, support their institutions’ formats, and work fully offline. It is a rare combination of utility and privacy in one tool.",

    // Testimonials
    testimonials: [
      {
        quote:
          "It’s like CamScanner but better—no ads, no login, and I can generate my assignment cover pages instantly!",
        author: "AIUB Student",
      },
      {
        quote:
          "I use it before every submission. It remembers my info and formats everything perfectly.",
        author: "NSU Business Student",
      },
    ],

    // Future Plans
    futurePlans:
      "We aim to include more template categories (e.g., internship reports, thesis), add OCR support for scanned text recognition, and eventually release an iOS version. Integration with cloud drives and educational platforms like Moodle is also on the roadmap.",
  },
  {
    title: "Trufslot",
    description:
      "A platform connecting sports enthusiasts with nearby turf facilities, simplifying the booking process and helping facility owners maximize their space utilization. Trufslot offers a robust, real-time booking system that prevents double-bookings and provides instant confirmation to users. The platform features a dual-dashboard system, catering separately to facility owners and players, each with tailored functionalities. Facility owners benefit from advanced booking management, analytics, and occupancy optimization tools, while players enjoy a seamless search, booking, and payment experience. Trufslot integrates secure local payment gateways and a verified review system, ensuring trust and transparency for all users. The platform's impact is evident in the increased occupancy rates and the growing community of sports enthusiasts who rely on it for organizing games and events.",
    overview:
      "Trufslot is a comprehensive platform that bridges the gap between sports enthusiasts and turf facility owners. It allows users to discover, book, and pay for turf slots in their vicinity, while helping facility owners manage their bookings and maximize occupancy. The system leverages real-time data, geolocation, and secure payment integrations to provide a frictionless experience for both sides of the marketplace. With features like automated notifications, booking history, and a custom geolocation system for areas with incomplete map data, Trufslot has become the go-to solution for recreational sports in Bangladesh. Its success is measured not just in bookings, but in the vibrant community it has helped foster.",
    image: "/turfslot/turf1.png",
    video: "",
    // github: "https://github.com",
    demo: "https://trufslot.com",
    className:
      "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/turfslot/turf1.png",
      "/turfslot/turf2.png",
      "/turfslot/turf3.png",
    ],
    tags: [
      "Sports",
      "Booking Platform",
      "Facility Management",
      "Real-time Scheduling",
    ],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",

    // Case Study Content
    clientName: "Turf Facility Owners and Sports Enthusiasts",
    clientIndustry: "Sports and Recreation",
    projectDuration: "5 months",
    teamSize: "6 developers, 1 UI/UX designer, 1 project manager",

    // The Problem
    problem:
      "Finding and booking sports turfs was a fragmented and inefficient process. Players had to call multiple venues to check availability, while facility owners struggled with manual booking systems and idle time slots. There was no centralized platform for discovering and booking turf facilities in Bangladesh.",

    // Challenges
    challenges: [
      "Creating a real-time booking system that prevents double-bookings across multiple users",
      "Developing an intuitive interface for both facility owners and players with different needs",
      "Implementing a secure payment gateway that works with local payment methods",
      "Building a rating and review system that remains fair and prevents abuse",
      "Optimizing location-based search for areas with incomplete map data",
    ],

    // Solutions
    solutions: [
      "Implemented a real-time reservation system with atomic transactions to prevent conflicts",
      "Designed separate dashboards for players and facility owners with role-specific features",
      "Integrated SSL Commerz for secure local payments with multiple options",
      "Created a verified review system that confirms bookings before allowing reviews",
      "Developed a custom geolocation system that works with alternative addressing methods",
    ],

    // Results and Impact
    results:
      "Trufslot has connected over 50 turf facilities with thousands of players, increasing facility occupancy rates by an average of 35%. The platform processes hundreds of bookings weekly, and has become the go-to solution for sports enthusiasts looking for places to play.",

    // Key Features
    keyFeatures: [
      "Location-based turf discovery",
      "Real-time availability checking",
      "Secure online booking and payment",
      "Facility owner dashboard with booking management",
      "Player profiles and booking history",
      "Ratings and reviews for facilities",
      "Notification system for bookings and reminders",
    ],

    // Technologies Used
    technologies: [
      "React for frontend development",
      "Node.js and Express for backend services",
      "MongoDB for database",
      "Socket.io for real-time updates",
      "SSL Commerz payment gateway",
      "Google Maps API for location services",
      "AWS for hosting and storage",
    ],

    // What Makes This Project Special
    specialFeatures:
      "Trufslot is special because it solves a two-sided market problem by creating value for both players and facility owners. The platform's real-time availability system and seamless payment process has transformed how recreational sports are organized in urban areas, making facilities more accessible and helping owners maximize their revenue.",

    // Testimonials
    testimonials: [
      {
        quote:
          "As a facility owner, I've seen my bookings increase by 40% since joining Trufslot. The dashboard makes management so much easier.",
        author: "Turf Owner in Dhaka",
      },
      {
        quote:
          "Finding a place to play used to be a nightmare. Now I just open Trufslot, see what's available nearby, and book in seconds.",
        author: "Regular Football Player",
      },
    ],

    // Future Plans
    futurePlans:
      "We're expanding Trufslot to include more types of sports facilities beyond football turfs, and developing features for team management and tournament organization.",
  },
  {
    title: "Biddarthi",
    description:
      "Biddarthi is a next-generation educational platform for Bangladesh, offering a complete digital learning ecosystem. Users can sign up or sign in using their phone number or email, and enroll in a wide range of courses. Each course features demo videos, downloadable materials, and a review system for enrolled students. The platform includes a shop section with product cards and detailed product pages, as well as a dedicated instructor page with comprehensive instructor profiles. Public users can browse course materials, while enrolled users get full access to course content and their enrollment details in a personalized profile page. All aspects of the platform, including user management, course content, reviews, and shop products, are managed from a powerful admin dashboard. Secure payments are handled via SSL Commerz integration, ensuring safe transactions for all users.",
    overview:
      "Biddarthi provides a robust and interactive learning experience, combining course enrollment, material access, demo videos, and a dynamic review system. The platform supports both public and enrolled users, with features like phone/email authentication, a shop for educational products, instructor detail pages, and a user profile section displaying enrolled courses and user information. Built with Next.js, Express.js, PostgreSQL, and Knex, Biddarthi is engineered for scalability, security, and seamless management through an advanced admin dashboard. SSL Commerz integration ensures secure local payments, making Biddarthi a comprehensive solution for modern education in Bangladesh.",
    image: "/biddarthi/biddarthi1.png",
    video: "",
    // github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator",
    className:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/biddarthi/biddarthi1.png",
      "/biddarthi/biddarthi2.png",
      "/biddarthi/biddarthi3.png",
    ],
    tags: ["Education", "E-Learning", "Academic Resources", "Exam Preparation"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",

    // Case Study Content
    clientName: "Students and Educational Institutions in Bangladesh",
    clientIndustry: "Education",
    projectDuration: "8 months",
    teamSize: "5 developers, 3 educational content specialists",

    // The Problem
    problem:
      "Bangladeshi students face numerous challenges in their academic journey, including limited access to quality study materials, lack of personalized learning paths, and inefficient exam preparation methods. Traditional educational resources often fail to address the specific needs of students across different regions and educational backgrounds.",

    // Challenges
    challenges: [
      "Creating content that aligns with various educational boards and curricula in Bangladesh",
      "Developing an adaptive learning system that caters to students with different learning paces",
      "Building a platform that works effectively in areas with limited internet connectivity",
      "Designing an engaging user experience that keeps students motivated",
      "Implementing effective progress tracking and performance analysis",
    ],

    // Solutions
    solutions: [
      "Collaborated with experienced educators to develop curriculum-aligned content",
      "Implemented an AI-driven learning path system that adapts to student performance",
      "Created offline functionality for core features with background synchronization",
      "Incorporated gamification elements to increase engagement and motivation",
      "Developed comprehensive analytics dashboards for students, parents, and teachers",
    ],

    // Results and Impact
    results:
      "Biddarthi has been adopted by thousands of students across Bangladesh, with users reporting an average improvement of 15% in exam scores. The platform has become particularly valuable in remote areas where access to quality educational resources is limited.",

    // Key Features
    keyFeatures: [
      "Curriculum-aligned study materials for multiple educational boards",
      "Adaptive practice tests with performance analysis",
      "Personalized learning paths based on student strengths and weaknesses",
      "Offline access to essential study materials",
      "Progress tracking and performance reports",
      "Virtual study groups and peer learning features",
      "Expert-led video lessons on complex topics",
    ],

    // Technologies Used
    technologies: [
      "Flutter for cross-platform mobile development",
      "Firebase for backend services and analytics",
      "TensorFlow for adaptive learning algorithms",
      "Cloud Firestore for scalable data storage",
      "ExoPlayer for video content delivery",
      "FCM for notifications",
    ],

    // What Makes This Project Special
    specialFeatures:
      "Biddarthi stands out by offering localized educational content specifically designed for the Bangladeshi education system. The platform's ability to function in low-connectivity environments and adapt to individual learning needs makes it particularly valuable for students in underserved areas.",

    // Testimonials
    testimonials: [
      {
        quote:
          "Biddarthi helped me prepare for my SSC exams in a way that felt personalized to my needs. The practice tests were particularly helpful.",
        author: "SSC Student from Khulna",
      },
      {
        quote:
          "As a teacher, I recommend Biddarthi to all my students. The content aligns perfectly with our curriculum and the analytics help me understand where students need additional support.",
        author: "High School Teacher, Dhaka",
      },
    ],

    // Future Plans
    futurePlans:
      "We're expanding Biddarthi to include university entrance exam preparation, career guidance, and integration with formal educational institutions for a more seamless learning experience.",
  },
  {
    title: "SDF Trade",
    description:
      "Trade Your Crypto on SDF Trade with Confidence. SDF Trade is a secure, user-friendly crypto trading platform that supports integration with major exchanges like Coinbase and Binance, as well as popular payment gateways such as PayPal. The platform is designed for both novice and experienced traders, offering real-time market data, advanced charting tools, and a seamless trading experience. SDF Trade prioritizes security with robust encryption, two-factor authentication, and regular security audits. Its intuitive interface, combined with educational resources and responsive customer support, empowers users to trade digital assets with confidence and ease.",
    image: "/sdftrade/sdf1.png",
    video: "",
    // github: "https://github.com",
    demo: "https://sdftrade.com",
    className:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/sdftrade/sdf1.png",
      "/sdftrade/sdf2.png",
      "/sdftrade/sdf3.png",
      "/sdftrade/sdf4.png",
      "/sdftrade/sdf5.png",
    ],
    tags: [
      "Trade",
      "Crypto",
      "Blockchain",
      "Tailwind CSS",
      "Coinbase",
      "Binance",
      "Paypal",
    ],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A robust e-commerce platform built with Laravel, designed to provide a seamless online shopping experience for both customers and administrators. The platform features a modern, responsive user interface, advanced inventory and order management, and a secure, streamlined checkout process. Integrated with the SSL Commerz payment gateway, it supports secure local transactions and multiple payment options popular in Bangladesh. The backend is engineered for scalability and reliability, supporting a wide range of products, high transaction volumes, and real-time order tracking. Business owners benefit from comprehensive analytics dashboards, promotional tools, and customer management features, all managed through an intuitive Laravel-powered admin panel. The platform's architecture ensures fast performance, security, and easy extensibility for future growth.",
    image: "/ecom/ecom1.png",
    video: "",
    github: "https://github.com",
    demo: "https://bdinclusive.com",
    className:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: ["/ecom/ecom1.png", "/ecom/ecom2.png", "/ecom/ecom3.png"],
    tags: ["E-commerce", "Online store", "Laravel", "SSL Commerz", "PHP"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Portfolio Website -Dr.Lipu",
    description:
      "Personal portfolio built with React and Tailwind CSS, featuring smooth animations, responsive design, and a showcase of professional achievements. The website highlights Dr. Lipu's expertise, projects, publications, and testimonials, all presented in a visually engaging and easy-to-navigate format. The use of modern web technologies ensures fast load times and a seamless user experience across devices. Custom animations and interactive elements add a unique touch, making the portfolio stand out among peers.",
    image: "/drlipu/drlipu1.png",
    video: "",
    demo: "https://drlipu.info",
    className:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/drlipu/drlipu1.png",
      "/drlipu/drlipu2.png",
      "/drlipu/drlipu3.png",
    ],
    tags: ["portfolio", "React", "Tailwind CSS", "animation"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Logos",
    description:
      "Crafting unique, professional logos that elevate your brand identity and leave a lasting impression. Our logo design portfolio showcases a diverse range of styles, from minimalist to intricate, each tailored to the specific needs and vision of our clients. We combine creativity with strategic thinking to deliver logos that not only look great but also communicate the essence of the brand. Our process involves in-depth research, multiple design iterations, and close collaboration with clients to ensure the final result exceeds expectations.",
    image: "/work5.png",
    video: "",
    github: "https://github.com",
    demo: "",
    className:
      "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: ["/work5.2.png", "/work5.3.png"],
    tags: ["chat", "real-time", "WebSocket", "encryption"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#03061c] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle:
      "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
];

// Add slug to each work item
const worksWithSlug = Works.map((work) => ({
  ...work,
  slug: createSlug(work.title), // Create slug from the title
}));

// Export the worksWithSlug array
export const WorksWithSlug = worksWithSlug;
