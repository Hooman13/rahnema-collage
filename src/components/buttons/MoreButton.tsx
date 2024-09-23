import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import React, { useState, PropsWithChildren } from "react";
import { BlockUnBlock } from "./BlockUnblock";
import { CloseFriendB } from "./CloseFriendB";
import { CloseFriendList } from "../CloseFriendList";
import { BlockList } from "../BlockList";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface IUser {
  user: string;
}

export const MoreButton: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const selectedAccount = Cookies.get("selectedAccount");
  const currentTokenCookie = Cookies.get("token");
  const token =
    currentTokenCookie && selectedAccount
      ? JSON.parse(currentTokenCookie)[parseInt(selectedAccount)]
      : null;

  const currentUsernameCookie = Cookies.get("username");
  const cookieUsername =
    currentUsernameCookie && selectedAccount
      ? JSON.parse(currentUsernameCookie)[parseInt(selectedAccount)]
      : null;

  const switchUser = () => {
    {
      selectedAccount === "0"
        ? Cookies.set(
            "selectedAccount",
            (parseInt(selectedAccount) + 1).toString(),
            {
              expires: 7,
            }
          )
        : Cookies.set("selectedAccount", "0", {
            expires: 7,
          });
    }
    window.location.reload();
  };

  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton>
          <div className="w-auto font-normal py-3 flex h-auto pr-3 lg:pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faList} />
            بیشتر
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute bottom-12 z-10 w-56  rounded-t-lg rounded-bl-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-3">
          <MenuItem>
            <div className=" data-[focus]:bg-gray-100 block px-4 py-2 text-xs font-normal text-Black data-[focus]:text-gray-900 ">
              <button
                onClick={() => {
                  switchUser();
                }}
              >
                برو به اونیکی اکانتم
              </button>
            </div>
          </MenuItem>
          <MenuItem>
            <div className=" data-[focus]:bg-gray-100">
              <Link to="/close-friend">
                <a
                  href="#"
                  className="block px-4 py-2 text-xs font-normal text-Black data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  دوستان نزدیک
                </a>
              </Link>
            </div>
          </MenuItem>
          <MenuItem>
            <div className=" data-[focus]:bg-gray-100">
              <Link to="/block-list">
                <a
                  href="#"
                  className="block px-4 py-2 text-xs font-normal text-Black data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  لیست سیاه
                </a>
              </Link>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
