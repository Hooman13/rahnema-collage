import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useState, PropsWithChildren } from "react";
import { BlockUnBlock } from "./BlockUnblock";
import { CloseFriendB } from "./CloseFriendB";
import { DeleteCloseFriend } from "./DeleteCloseFriend";
import { ChatModal } from "../../features/chat/components/ChatModal";

interface IUser {
  user: string;
  relation?: string;
  fullname?: string;
  imgUrl?: string;
}

export const RelationButton: React.FC<PropsWithChildren<IUser>> = ({
  user,
  relation,
  children,
  fullname,
  imgUrl,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && (
        <ChatModal
          fullname={fullname}
          imgUrl={imgUrl}
          openModal={openModal}
          setOpenModal={setOpenModal}
          reciverUsername={user}
        />
      )}
      <Menu as="div" className="relative inline-block">
        <div>
          <MenuButton className="text-[#EA5A69] text-4xl items-end">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 w-56 origin-top-right rounded-tr-lg rounded-b-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-3">
            <MenuItem>
              <button
                onClick={() => setOpenModal(true)}
                className="block px-4 py-2 text-xs font-normal text-Black"
              >
                پیام
              </button>
            </MenuItem>
            {relation === "friend" ? (
              <MenuItem>
                <div className=" data-[focus]:bg-gray-100">
                  <DeleteCloseFriend user={user} relation={relation} />
                </div>
              </MenuItem>
            ) : relation === "follow" ? (
              <MenuItem>
                <div className=" data-[focus]:bg-gray-100">
                  <CloseFriendB user={user} relation={relation} />
                </div>
              </MenuItem>
            ) : null}
            <MenuItem>
              <div className=" data-[focus]:bg-gray-100">
                <BlockUnBlock user={user} relation={relation} />
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};
