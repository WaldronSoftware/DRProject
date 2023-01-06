import React from "react";
import { FC, ReactNode, PropsWithChildren } from "react";
import { Router } from "next/router";
import Navbar from "./navbar";
import { Toast } from "flowbite-react";

type layoutProp = {
  children: ReactNode;
};

const Layout = ({ children }: layoutProp) => {
  const router = Router;

  return (
    <div className="max-w-full mx-auto min-h-screen relative">
      <Toast
        className="absolute bottom-5 z-50"
        style={{
          left: "50%",
          // right: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
        <Toast.Toggle />
      </Toast>

      <Navbar />
      <>{children}</>
    </div>
  );
};

export default Layout;
