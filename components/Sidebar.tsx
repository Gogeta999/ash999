import Link from "next/link";
import { useState, useEffect } from "react";
import * as types from "../@types/types";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaAngleDoubleRight } from "react-icons/fa";
import useDarkMode from "use-dark-mode";

export const Sidebar: React.FC<types.CategoriesProps> = ({ catData }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  const darkMode = useDarkMode(false, { classNameDark: "dark-mode" });

  const isDarkMode = darkMode.value;

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    // console.log("Sidebar Open", showSidebar);
  };

  const [showDropdown, setShowDropdown] = useState(true);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
    // console.log("Dropdown Open", showDropdown);
  };

  return (
    <>
      {hasMounted ? (
        <button
          className={`${showSidebar ? "" : "hidden"} ${
            isDarkMode ? "bg-darkBG text-darkTxt" : ""
          } positioned  hover:text-evagreen `}
          aria-label="Open"
          onMouseEnter={handleSidebar}
        >
          <FaAngleDoubleRight className="SidebarIcon" />
        </button>
      ) : null}
      {hasMounted ? (
        <div className={`${showSidebar ? "hidden" : ""} `}>
          <aside
            className={`${
              isDarkMode ? "bg-darkBG" : ""
            } flex flex-col  sticky top-0  overflow-y-auto h-full  w-22 md:w-40 items-center space-y-10 z-30 pb-2.5 border-2 border-evagreen`}
            onMouseLeave={handleSidebar}
          >
            <div className="text-xs md:text-lg py-2  transition duration-200 ease-in">
              <p
                className={`${
                  isDarkMode ? "text-darkTxt" : ""
                } flex flex-row  font-medium text-start text-gray uppercase`}
              >
                Categories
                <button
                  className={`${
                    showDropdown
                      ? "hover:text-evagreen"
                      : "hover:text-purple-600"
                  }`}
                  aria-label="Dropdown If have child"
                  onMouseEnter={handleDropdown}
                >
                  <IoIosArrowDropdownCircle />
                </button>
              </p>
            </div>

            {catData?.allCategories.map((category) => (
              <div
                key={category.id}
                className={`${category.isEnable ? "" : "hidden"} ${
                  isDarkMode ? "text-darkTxt" : ""
                } text-xs tracking-tighter md:text-lg text-center transition duration-200 ease-in`}
              >
                <Link
                  href={{
                    pathname: `/${category.name}-${category.notionId}`,
                    query: {
                      pageId: category.notionId,
                      pageName: category.name,
                    },
                  }}
                >
                  <a className={"hover:text-evagreen"}>{category.name}</a>
                </Link>

                {category.child.map((childCategory) => (
                  <div
                    key={childCategory.id}
                    className={`${
                      showDropdown ? "" : "hidden"
                    } items-center flex-col flex `}
                  >
                    <Link
                      href={{
                        pathname: `/${category.notionId}`,
                        query: {
                          pageId: category.notionId,
                        },
                      }}
                      // as= {`/${category.notionId}`}
                    >
                      <a className="flex flex-row items-center hover:text-evagreen">
                        -{childCategory.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </aside>
        </div>
      ) : null}
    </>
  );
};
