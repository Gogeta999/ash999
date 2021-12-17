import axios from "axios";
import { useState, useEffect } from "react";
import * as types from "../@types/types";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";

export default function Search() {
  //For Search Input And Changes
  const [searchValue, setSearchValue] = useState("");

  const [searchActive, setSearchAtive] = useState(false);
  //For Saving Results
  const [notionSearchResults, setNotionResults] = useState<types.NotionSearch>({
    object: "null",
    has_more: false,
    next_cursor: null,
    results: [],
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // console.log(searchValue);
      setSearchAtive(true);
      if (searchValue.length) {
        const notionFetch = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // baseURL: "http://127.0.0.1:8000/blog/search",
          baseURL: "https://api.ash999.xyz/blog/search",
          data: searchValue,
        }).then((res) => res.data);
        setNotionResults(notionFetch);
        // console.log("SearchRes----", searchValue, "----", notionSearchResults);
        setSearchAtive(false);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  // const onFocus = () => {
  //   setSearchAtive(true);
  // };

  return (
    <div className="flex flex-col self-center ">
      <div className="flex flex-col self-center ">
        <div className="pt-2 relative">
          <input
            name="search"
            // type="search"
            placeholder="Search..."
            className="focus:ring-2 focus:ring-blue-600 
        border-2 border-gray-300 bg-white h-10 px-4 w-42 md:w-96 rounded-lg text-sm 
        focus:shadow focus:outline-none"
            value={searchValue}
            // onChange={onChange}
            onChange={(e) => setSearchValue(e.target.value)}
            // onFocus={onFocus}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-5 mr-4 w-4 h-4"
          >
            {searchActive ? (
              <img src="/search_loading_spin.svg" alt="Loading Icon"></img>
            ) : (
              <IoSearch />
            )}
          </button>
        </div>
        {/* <h1>Inputing: {searchValue}</h1>
        <h1>Test ResultArray: {notionSearchResults?.results?.length}</h1> */}
      </div>
      {notionSearchResults?.results &&
        notionSearchResults?.results?.map((blog) => (
          <div
            key={blog.id}
            // className={`${blog.object == "page" || "database" ? "" : "hidden"}`} Hide Database Result TODO: Add This Result Later
            className={`${
              blog.object == "page" ? "" : "hidden"
            } border-2 border-evagreen my-1`}
          >
            {blog?.properties.title?.title?.map((title) => (
              <div key={title.type} className="flex flex-row">
                <div className="w-5">
                  <img src={blog.icon?.file?.url} alt="" />
                </div>
                <Link
                  href={{
                    pathname: `/${title.plain_text}-${blog.id}`,
                  }}
                >
                  <a>Include in {title.plain_text}</a>
                </Link>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
