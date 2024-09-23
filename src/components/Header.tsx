import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CreatePost } from "../pages/CreatePost";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState<string>("5xl");
  return (
    <header className="relative h-[72px] bg-[#F5F5F5] w-full">
      <nav className="bg-[#F5F5F5] max-w-7xl mx-auto px-4 md:px-10 fixed top-0 z-10 w-full left-1/2 -translate-x-1/2">
        <div className="flex items-center justify-between py-2 px-4">
          <button
            onClick={() => {
              setOpenModal(true);
              setModalSize("xl");
            }}
            className="w-auto px-12 py-2 text-sm bg-[#EA5A69] rounded-3xl text-white"
          >
            <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
            پست جدید
          </button>
          <div className="col-span-10 flex items-center">
            <img className="w-[82px] h-[49px]" src="../img/logo.png" alt="" />
          </div>
          <CreatePost openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </nav>
    </header>
  );
};
