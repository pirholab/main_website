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
    title: "Task Manager",
    description: "Minimalist todo app with drag-and-drop functionality and real-time updates",
    // image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    video:"/projects.mp4",
    github: "https://github.com",
    demo: "https://demo.com",
    className: "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["productivity", "task management", "drag-and-drop", "real-time"],
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
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    video:"",
    github: "https://github.com",
    demo: "https://demo.com",
    className: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["e-commerce", "online store", "React", "Redux", "Stripe"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "AI Image Generator",
    description: "Create unique artwork using stable diffusion with customizable parameters",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=800&q=80",
    video:"",
    github: "https://github.com",
    demo: "https://demo.com",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["AI", "image generation", "art", "stable diffusion"],
    gooyey: true,
    textBody: "p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit",
    trRef: "trRef",
    loading: "loading",
    setLoading: "setLoading",
    linkStyle: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
  },
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with React and Tailwind CSS, featuring smooth animations",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    video:"",
    github: "https://github.com",
    demo: "https://demo.com",
    className: "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
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
    title: "Chat Application",
    description: "Real-time messaging app using WebSocket technology with end-to-end encryption",
    image: "https://images.unsplash.com/photo-1461532257246-777de18cd58b?auto=format&fit=crop&w=800&q=80",
    video:"",
    github: "https://github.com",
    demo: "https://demo.com",
    className: "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center",
    textStyle: "text-white text-[1rem] text-gray-900",
    extraImages: [
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
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
