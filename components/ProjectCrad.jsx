import { SingleSplitText } from "@/ui/SingleSplitText";
import Image from "next/image";
import React from "react";

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

  console.log(vid ? `Video source: ${vid}` : "No video provided");

  return (
    <div
      className={`group relative overflow-hidden bg-transparent transition-all duration-500 hover:shadow-2xl md:rounded-3xl ${className}`}
    >
      <div
        className={`relative z-10 h-[100%] flex w-[95%] rounded-2xl bg-transparent text-center md:bg-zinc-700 md:w-full flex-col ${contStyle}`}
      >
        <div className="flex items-center md:items-start flex-row">
          <div className="flex items-start">
            <SingleSplitText textBody={textBody} className={`${textStyle}`}>
              {title}
            </SingleSplitText>
            {gooyey && (
              <svg
                id="Layer_1"
                className="w-[30px] rotate-[270deg] relative bottom-0"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                viewBox="0 0 100 100"
              >
                <path
                  fill="#18171b"
                  d="M98.1 0h1.9v51.9h-1.9c0-27.6-22.4-50-50-50V0h50z"
                ></path>
              </svg>
            )}
          </div>
        </div>

        <div className="w-full h-full absolute" style={{ zIndex: -1 }}>
          {vid ? (
            <video
              width="1280"
              height="720"
              className="w-full h-full object-cover group-hover:scale-110 transition-all"
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
              <Image
                src={image}
                width={300}
                height={300}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
