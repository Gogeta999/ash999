import Link from "next/link";
import { useState } from "react";
import { IoSearch, IoMenu } from "react-icons/io5";
import Modal from "react-modal";
import Search from "./Searchbar";

Modal.setAppElement("#__next");

export const Navbar = () => {
  //For Menu
  const [active, setActive] = useState(false);

  const handleMenuClick = () => {
    setActive(!active);
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

  return (
    <>
      <header className="flex  w-full flex-wrap bg-purple-600 bg-opacity-50 py-2.5  ">
        <Link href="/">
          <img
            src="/Ash999.svg"
            alt="Navbar default icon"
            width="200"
            height="100"
          />
        </Link>

        <div className=" ml-auto inline-flex">
          {/* <button
            className="p-3  hover:bg-white-300 lg:hidden text-white  hover:text-white outline-none"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <IoMenu />
          </button> */}
          <button
            className="text-white w-10 h-10 lg:hidden relative focus:outline-none"
            onClick={handleMenuClick}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`${
                  active ? "rotate-45" : "-translate-y-1.5"
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
                  active ? "-rotate-45" : "translate-y-1.5"
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
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <button
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center  hover:bg-evagreen"
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
                <Search />
              </div>
            </Modal>

            <Link href="/about">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center  hover:bg-evagreen mr-2">
                Me
              </a>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
