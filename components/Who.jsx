
import { motion } from "framer-motion";

import Button from "@/components/Button";
import { Oswald } from "next/font/google";


const oswald = Oswald({ subsets: ["latin"] });
export default function Who() {
  
  
  
  return (
    <div className="w-full h-[50vh] flex items-center content-center justify-center">
      <div className="w-[92%] sm:w-[80%]">
        <div className="flex items-start content-center justify-between flex-col sm:flex-row">
          <div>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className=""
            >
              <h1 className={`text-white text-xl `}>⚪ Who we are</h1>
            </motion.div>
          </div>
          <br />
          <div className="text-left sm:text-right w-full sm:w-[75%] flex flex-col items-start sm:items-end">
            <p className={`text-white text-[large] sm:text-2xl md:text-4xl `}>
              {`PiRhoTech is a web design, development, and digital marketing agency.
            We create impactful websites and strategies that enhance your online
            presence and drive success.`}
            </p>
            <br />
           
            <Button href={"/about"} className="flex w-auto border rounded-[23px] pl-[9px] pr-[5px] pt-[7px] pb-[7px]" height="54px" color="blue">
              About PiRhoTech
            </Button>
          
          </div>
        </div>
      </div>
      
    </div>
  );
}
