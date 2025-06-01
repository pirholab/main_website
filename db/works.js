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
    title: "Cover page generator",
    description: "This app is perfect for students at all universities in Bangladesh, including BUET, DU, NSU, BRAC, and others, who need a fast and reliable tool to generate assignment or lab report or portfolio cover pages. No more wasting time on formatting or using complicated",
    image: "/cover-page-generator/cover4.png",
    // github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator&hl=en",
    className: "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/cover-page-generator/cover1.png",
      "/cover-page-generator/cover2.png",
      "/cover-page-generator/cover3.png",

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
    title: "Trufslot",
    description: "Find Best Turf Nearby Elevate your game on top-notch surfaces that offer performance and resilience.Locate the ideal sports turf in your vicinity and step into a world of superior playing fields",
    image: "/turfslot/turf1.png",
    video:"",
    // github: "https://github.com",
    demo: "https://trufslot.com",
    className: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/turfslot/turf1.png",
      "/turfslot/turf2.png",
      "/turfslot/turf3.png",
    ],
    tags: ["E-commerce", "Online store", "React", "Redux", "SSL Commerz"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Biddarthi",
    description: "A revolutionary approach to education that transforms how you learn, prepare, and succeed in your academic journey.",
    image: "/biddarthi/biddarthi1.png",
    video:"",
    // github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.pirhotech.coverpagegenerator",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/biddarthi/biddarthi1.png",
      "/biddarthi/biddarthi2.png",
      "/biddarthi/biddarthi3.png",
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
    title: "SDF Trade",
    description: "Trade Your Crypto on SDF Trade with Confidence",
    image: "/sdftrade/sdf1.png",
    video:"",
    // github: "https://github.com",
    demo: "https://sdftrade.com",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/sdftrade/sdf1.png",
      "/sdftrade/sdf2.png",
      "/sdftrade/sdf3.png",
      "/sdftrade/sdf4.png",
      "/sdftrade/sdf5.png",
      
    ],
    tags: ["Trade", "Crypto", "Blockchain", "Tailwind CSS", "Coinbase", "Binance", "Paypal"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with React, Redux, and Stripe integration.",
    image: "/ecom/ecom1.png",
    video:"",
    github: "https://github.com",
    demo: "https://bdinclusive.com",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/ecom/ecom1.png",
      "/ecom/ecom2.png",
      "/ecom/ecom3.png",
    ],
    tags: ["E-commerce", "Online store", "React", "Redux", "Stripe"],
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
    image: "/drlipu/drlipu1.png",
    video:"",
    demo: "https://drlipu.info",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "/drlipu/drlipu1.png",
      "/drlipu/drlipu2.png",
      "/drlipu/drlipu3.png",
      
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
