import * as React from "react";
import { useEffect, useState } from "react";

import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";

import { IoSunnyOutline, IoMoonSharp } from "react-icons/io5";

import useDarkMode from "use-dark-mode";

export const Footbar: React.FC<{}> = ({}) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const darkMode = useDarkMode(false, { classNameDark: "dark-mode" });

  const isDarkMode = darkMode.value;

  return (
    <footer className={`${isDarkMode ? "" : ""} border-t`}>
      {hasMounted ? (
        <div
          className={`${
            isDarkMode ? "bg-darkBG" : ""
          } flex flex-wrap items-center justify-between p-3 m-auto`}
        >
          <div className="container mx-auto flex flex-col flex-wrap items-center justify-between">
            <button
              className={`${
                isDarkMode
                  ? "text-white hover:text-yellow-500"
                  : "hover:text-grey-500"
              } text-3xl`}
              aria-label="toggle darkmode"
              onClick={darkMode.toggle}
              title="Toggle dark mode"
            >
              {isDarkMode ? (
                <IoMoonSharp className="hover:animate-bounce" />
              ) : (
                <IoSunnyOutline className="hover:animate-bounce" />
              )}
            </button>

            <div className="flex mx-auto text-center">
              <a
                className={`${
                  isDarkMode ? "text-white" : ""
                } p-2 cursor-pointer text-3xl  hover:text-twitterBlue `}
                href={`https://twitter.com/666ash999`}
                title={`Twitter @Ash999`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>

              <a
                className={`${
                  isDarkMode ? "text-white" : ""
                } p-2 cursor-pointer text-3xl hover:text-instagramPink`}
                href={`https://www.instagram.com/win_ash999/`}
                title={`Instagram @Win_Ash999`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                className={`${
                  isDarkMode ? "text-white" : ""
                } p-2 cursor-pointer text-3xl hover:text-purple-600`}
                href={`https://github.com/Gogeta999`}
                title={`GitHub @Gogeta999`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>

            <div className={`${isDarkMode ? "text-darkTxt" : ""}`}>
              Copyright 2021 by Ash999
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
};
