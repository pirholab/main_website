import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [showNave, setShowNave] = useState(false);

  return (
    <div>
      <nav className=" bg-zinc-900 relative w-full z-20 top-0 start-0 border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Get started
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={() => {
                setShowNave(!showNave);
              }}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-zinc-700 focus:ring-zinc-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${showNave ? "scale-y-[1]" : "scale-y-0"
              } items-center justify-between md:scale-[1] transition-all w-full md:flex md:w-auto md:order-1 top-0`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border w-full md:w-auto absolute md:relative md:w-[100%] rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-zinc-900 border-none">
              <li>
                <Link
                  href="#"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="navanimation py-2 px-3 text-3xl md:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
