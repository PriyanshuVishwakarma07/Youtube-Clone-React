import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { cacheResults } from "../utils/searchSlice";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaYoutube } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionFocus, setSuggestionFocus] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const isDarkTheme = useSelector((store) => store.app.isDarkTheme);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchText]) {
        setSuggestions(searchCache[searchText]);
      } else if (searchText) {
        getSearchSuggestion();
      } else {
        setSuggestions([]);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const getSearchSuggestion = async () => {
    try {
      const response = await fetch(
        `/api/search-suggestions?q=${encodeURIComponent(searchText)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      setSuggestions(data[1]);
      dispatch(
        cacheResults({
          [searchText]: data[1],
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const toggleMenuClickHandle = () => {
    dispatch(toggleMenu());
  };
  return (
    <div
      className={`flex fixed top-0 left-0 right-0 flex-col ${
        isDarkTheme ? "text-white bg-black" : "bg-white"
      }  z-50 md:grid md:grid-flow-col px-4 py-2 items-center`}
    >
      <div className="flex justify-between w-full md:w-auto items-center md:col-span-1">
        <div className="flex items-center gap-3">
          <IoIosMenu
            size={50}
            className="p-2 cursor-pointer"
            onClick={toggleMenuClickHandle}
          />
          <Link to="/">
            <div className="flex items-center gap-1 md:ml-2 ml-3">
              <FaYoutube size={35} />
              <span className="text-[20px] font-sans leading-10 font-extrabold">
                GALLERIA
              </span>
            </div>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <MdAccountCircle size={35} className="cursor-pointer" />
        </div>
      </div>

      <div className="w-full md:w-auto md:ml-30  md:mt-3 md:col-span-9 md:text-center ">
        <div className="relative flex">
          <input
            id="mobile-search"
            type="text"
            placeholder="Search"
            className="border-[1px] w-full md:w-[83%] text-[16px] md:text-[18px] p-2 px-5 placeholder:text-gray-500 rounded-l-full border-gray-400 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setSuggestionFocus(true)}
            onBlur={() => setTimeout(() => setSuggestionFocus(false), 200)}
          />
          <button
            className={`border-[1px] rounded-r-full p-2 md:pt-[10px] md:pb-[12px] md:px-4 border-gray-400 bg-gray-50 cursor-pointer hover:bg-gray-200 ${
              isDarkTheme ? "bg-white/10" : ""
            }`}
          >
            <HiMagnifyingGlass size={22} className="align-middle" />
          </button>
        </div>

        {suggestionFocus && suggestions.length > 0 && (
          <div
            className={`absolute md:fixed  rounded-[10px] shadow-2xl w-[90%]  md:w-[480px] md:left-[50%] md:translate-x-[-50%] px-2 py-2 mt-1 text-left border-gray-300 z-50  ${
              isDarkTheme ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {suggestions.map((s) => (
              <Link
                key={s}
                to={"/search?s=" + s}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setSearchText(s)}
              >
                <p
                  className={`flex items-center gap-3 text-[16px] md:text-[18px] mb-1.5  py-1.5 px-1.5 rounded-[5px] ${
                    isDarkTheme ? "hover:bg-white/10" : "hover:bg-gray-200"
                  }`}
                >
                  <HiMagnifyingGlass size={22} color="gray" />
                  {s}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex col-span-3 justify-end items-center">
        <Link to="/signin">
          <p
            className={`px-2.5 mr-3.5 flex items-center py-2 bg-gray-200 rounded-full text-[14px] font-semibold ${
              isDarkTheme ? "bg-white/10" : ""
            }`}
          >
            <GoPlus size={25} className="mr-1" />
            Create
          </p>
        </Link>
        <Link to="/signin">
          <IoNotificationsOutline size={25} className="mr-3.5 cursor-pointer" />
        </Link>

        <Link to="/signin">
          <MdAccountCircle size={35} className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
