import React, { useState, useRef } from "react";
import { ProjectCard } from "@/components/ProjectCrad";
import TransitionLink from "@/ui/TransitionLink";
import { WorksWithSlug as Works} from "../db/works";


function Project() {
  const [isHovered, setIsHovered] = useState(false);

  const trRef = useRef();

  const [loading, setLoading] = useState(false);

  console.log(Works[0].title.split(" ").join("-").toLowerCase());
  

  return (
    <div>
      <div className="min-h-screen mt-[10px] md:mt-[100px] bg-transparent p-4 md:p-6 lg:p-12">
        {/* <CustomCursor /> */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:auto-rows-[200px] md:grid-cols-6 lg:gap-8">
            {/* <ProjectCard
              title="Our Works"
              className="flex md:row-span-1 md:col-start-1 md:col-end-3 justify-center items-center"
              textStyle="text-white text-gray-900 leading-[0.8] text-center text-[3.5rem] dm:text-[4rem] lg:text-start lg:text-[5rem]"
              contStyle="justify-center"
              textBody="justify-center p-3 leading-[1]"
            />
            <TransitionLink
              href={`/work/`}
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
              linkStyle={
                "md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[auto] flex justify-center items-center"
              }
              className={"w-full h-full"}
            >
              <ProjectCard
                title="Task Manager"
                description="Minimalist todo app with drag-and-drop functionality and real-time updates"
                image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
                github="https://github.com"
                demo="https://demo.com"
                className="md:col-start-1 md:col-end-3 md:row-start-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
                textStyle="text-white text-[1rem] text-gray-900 "
                gooyey={true}
                textBody="p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit"
                setLoading={setLoading}
                trRef={trRef}
                loading={loading}
              />
            </TransitionLink>

            <TransitionLink
              href="/"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
              linkStyle={
                "md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
              }
              className={"w-full h-full"}
            >
              <ProjectCard
                title="E-Commerce Platform"
                description="A full-featured online store with React, Redux, and Stripe integration. Includes cart management, user authentication, and payment processing."
                image="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
                github="https://github.com"
                demo="https://demo.com"
                className="md:col-start-3 md:col-end-7 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
                textStyle="text-white text-[1rem] text-gray-900 "
                gooyey={true}
                textBody="p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit"
              />
            </TransitionLink>

            <TransitionLink
              href="/"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
              linkStyle={
                "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
              }
              className={"w-full h-full"}
            >
              <ProjectCard
                title="AI Image Generator"
                description="Create unique artwork using stable diffusion with customizable parameters"
                image="https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=800&q=80"
                github="https://github.com"
                demo="https://demo.com"
                className="md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
                textStyle="text-white text-[1rem] text-gray-900 "
                gooyey={true}
                textBody="p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit"
              />
            </TransitionLink>

            <TransitionLink
              href="/"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
              linkStyle={
                "md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
              }
              className={"w-full h-full"}
            >
              <ProjectCard
                title="Portfolio Website"
                description="Personal portfolio built with React and Tailwind CSS, featuring smooth animations"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                github="https://github.com"
                demo="https://demo.com"
                className="md:col-span-3 md:row-span-2 h-[401px] md:h-[100%] w-full flex justify-center items-center"
                textStyle="text-white text-[1rem] text-gray-900 "
                gooyey={true}
                textBody="p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit"
              />
            </TransitionLink>

            <TransitionLink
              href="/"
              trRef={trRef}
              loading={loading}
              setLoading={setLoading}
              linkStyle={
                "md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center"
              }
              className={"w-full h-full"}
            >
              <ProjectCard
                title="Chat Application"
                description="Real-time messaging app using WebSocket technology with end-to-end encryption"
                image="https://images.unsplash.com/photo-1461532257246-777de18cd58b?auto=format&fit=crop&w=800&q=80"
                github="https://github.com"
                demo="https://demo.com"
                className="md:col-span-6 md:row-span-1 h-[401px] md:h-[100%] w-full flex justify-center items-center"
                textStyle="text-white text-[1rem] text-gray-900 "
                gooyey={true}
                textBody="p-[10px] pl-[1px] rounded-br-[10px] bg-[#18171b] w-fit"
              />
            </TransitionLink> */}

            {/* {Works.map((e,i)=>{
               if (!e.href) {
                console.log(e.title)
                return (
                  <ProjectCard
                    key={i}
                    title={e.title}
                    className={e.className}
                    textStyle={e.textStyle}
                    contStyle="justify-center"
                    textBody={e.textBody}
                  />
                );
               }else{
                 return(
                  <TransitionLink
                  key={i}
                  href={e.href}
                  trRef={trRef}
                  loading={loading}
                  setLoading={setLoading}
                  linkStyle={e.linkStyle}
                  className="w-full h-full"
                >
                  
                  <ProjectCard
                    title={e.title}
                    description={e.description}
                    image={e.image}
                    github={e.github}
                    demo={e.demo}
                    className={e.className}
                    textStyle={e.textStyle}
                    gooyey={true}
                    textBody={e.textBody}
                  />
                </TransitionLink>
                )
               }
            })} */}
            {console.log(Works)}
            {Works.map((e,i)=>(
              
              !e.gooyey ? <ProjectCard
              key={i}
              title={e.title}
              className={e.className}
              textStyle={e.textStyle}
              contStyle="justify-center"
              textBody={e.textBody}
            />:<TransitionLink
            key={i}
            href={`/works/${e?.slug}`}
            trRef={trRef}
            loading={loading}
            setLoading={setLoading}
            linkStyle={e.linkStyle}
            className="w-full h-full"
          >
            {console.log(e.video)}
            <ProjectCard
              title={e.title}
              description={e.description}
              image={e.image}
              vid={e.video}
              className={e.className}
              textStyle={e.textStyle}
              gooyey={true}
              textBody={e.textBody}
            />
          </TransitionLink>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-[#18181b] h-[150dvh] w-full opacity-80 transition-all duration-300 ${
          loading ? " opacity-[1]" : "opacity-[0] pointer-events-none"
        }`}
        style={{ zIndex: 99999999999999, backgroundColor: "#18181b" }}
        ref={trRef}
      />
    </div>
  );
}

export default Project;
