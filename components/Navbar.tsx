import Link from "next/link";
import React, { useState } from "react";
import { IoSearch, IoMenu, IoFilter } from "react-icons/io5";
import Modal from "react-modal";
import { MobileCat } from "./MobileCategory";
import Search from "./Searchbar";
import * as types from "../@types/types";
import Image from "next/image";

Modal.setAppElement("#__next");

export const Navbar: React.FC<types.CategoriesProps> = ({ catData }) => {
  //For Menu
  const [active, setActive] = useState(false);

  const handleMenuClick = () => {
    setActive(!active);
  };

  //For Mobile Cat
  const [catActive, setCatActive] = useState(false);

  const handleCatClick = () => {
    setCatActive(!catActive);
  };

  //For Search Modal
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
    // console.log("Modal Is Open", modalIsOpen);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }

  //For PhoneCatModal
  const [catIsOpen, setCatOpen] = useState(false);
  function catOpenModal() {
    setCatOpen(true);
  }
  function catAfterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function catCloseModal() {
    setCatOpen(false);
  }

  return (
    <>
      <nav className="flex h-fit w-full flex-wrap bg-purple-600 bg-opacity-50 p-1 z-50 ease-in ">
        <Link href="/">
          <div className=" relative   ml-4 h-12 w-32 cursor-pointer">
            <Image layout="fill" src="/Ash999.svg" alt="Navbar Icon" />
          </div>
          {/* <img
              src="/Ash999.svg"
              alt="Navbar default icon"
              width="200"
              height="100"
            /> */}
        </Link>

        <div className=" ml-auto inline-flex">
          <button
            className="text-white w-10 p-3 lg:hidden relative focus:outline-none"
            onClick={handleMenuClick}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`${
                  active ? "rotate-225" : "-translate-y-1.5"
                } block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}
              />
              <span
                aria-hidden="true"
                className={`${
                  active ? "opacity-0" : ""
                } block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}
              />
              <span
                aria-hidden="true"
                className={`${
                  active ? "rotate-135" : "translate-y-1.5"
                } block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out`}
              />
            </div>
          </button>
        </div>

        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className=" lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center place-content-end  flex flex-row lg:h-auto">
            <button
              className="lg:hidden items-center justify-center py-2 px-3 rounded text-white hover:bg-evagreen"
              onClick={catOpenModal}
            >
              <IoFilter />
            </button>

            <Modal
              className="relative container mx-auto bg-gray-50"
              isOpen={catIsOpen}
              onAfterOpen={catAfterOpenModal}
              onRequestClose={catCloseModal}
              shouldCloseOnOverlayClick={true}
              contentLabel="Category Modal"
            >
              <div className="border-4 flex flex-col h-screen">
                <button
                  className="flex flex-col items-end w-full"
                  aria-label="close modal"
                  onClick={catCloseModal}
                >
                  close
                </button>
                <MobileCat catData={catData} onSubmit={catCloseModal} />
              </div>
            </Modal>
            {/* Search Button */}
            <button
              className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-white font-bold items-center justify-center  hover:bg-evagreen"
              aria-label="open modal"
              onClick={openModal}
            >
              <IoSearch />
            </button>

            <Modal
              className="relative container mx-auto bg-gray-50"
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true}
              contentLabel="Modal"
            >
              <div className="border-4 flex flex-col h-screen">
                <button
                  className="flex flex-col items-end w-full"
                  aria-label="close modal"
                  onClick={closeModal}
                >
                  close
                </button>
                <Search onSubmit={closeModal} />
              </div>
            </Modal>

            {/* About Button */}
            <Link href="/me">
              <a className="lg:inline-flex lg:w-auto px-3 py-2 rounded text-white font-bold items-center justify-center  hover:bg-evagreen mr-2">
                Me
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
