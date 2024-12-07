// Function to convert title into a slug
function createSlug(title) {
  return title
    .toLowerCase()               // Convert to lowercase
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')     // Remove non-alphanumeric characters
    .replace(/\-\-+/g, '-')       // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '')           // Remove leading hyphens
    .replace(/-+$/, '');          // Remove trailing hyphens
}

const Works = [
  {
    title: "Our Works",
    className: "flex md:row-span-1 md:col-start-1 md:col-end-3 justify-center items-center",
    textStyle: "text-white text-gray-900 leading-[0.8] text-center text-[3.5rem] dm:text-[4rem] lg:text-start lg:text-[5rem]",
    contStyle: "justify-center",
    textBody: "justify-center p-3 leading-[1]",
    description: null,
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
    title: "Brain Adorn -Android App",
    description: "Brain Adorn: Puzzle & Recall game is to Immerse yourself in the world of brain-boosting challenges with our innovative game that combines the excitement of word puzzles and the power of memorization into one engaging experience! Designed to provide you with endless fun while enhancing your cognitive skills, our game offers a unique blend of entertainment and mental exercise.",
    // image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    video:"/work2.mp4",
    github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.brainadorn&pcampaignid=web_share",
    className: "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/work2.1.png",
      "/work2.2.png",
      "/work2.3.png",
    ],
    tags: ["Productivity", "Task management", "Game", "Real-time"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[auto] flex justify-center items-center",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with React, Redux, and Stripe integration.",
    image: "/work1.png",
    video:"",
    github: "https://github.com",
    demo: "https://bdinclusive.com",
    className: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/work1.png",
      "/work1.1.png",
      "/work1.2.png",
    ],
    tags: ["E-commerce", "Online store", "React", "Redux", "Stripe"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Cover-Page Generator - PDF",
    description: "This app is perfect for students at all universities in Bangladesh, including BUET, DU, NSU, BRAC, and others, who need a fast and reliable tool to generate assignment or lab report or portfolio cover pages. No more wasting time on formatting or using complicated",
    image: "/work3.png",
    video:"",
    github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/work3.1.png",
      "/work3.2.png",
      "/work3.3.png",
    ],
    tags: ["Pdf", "Image generation", "Cover", "University"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Portfolio Website -Dr.Lipu",
    description: "Personal portfolio built with React and Tailwind CSS, featuring smooth animations",
    image: "/work4.png",
    video:"",
    github: "https://github.com",
    demo: "https://drlipu.info",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/work4.1.png",
      "/work4.3.png",
      
    ],
    tags: ["portfolio", "React", "Tailwind CSS", "animation"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Logos",
    description: "Crafting unique, professional logos that elevate your brand identity and leave a lasting impression.",
    image: "/work5.png",
    video:"",
    github: "https://github.com",
    demo: "",
    className: "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      
      "/work5.2.png",
      "/work5.3.png",
    ],
    tags: ["chat", "real-time", "WebSocket", "encryption"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
];



// Add slug to each work item
const worksWithSlug = Works.map(work => ({
  ...work,
  slug: createSlug(work.title)  // Create slug from the title
}));

// Export the worksWithSlug array
export const WorksWithSlug = worksWithSlug;
