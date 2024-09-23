import { useState } from "react";
import { LanguageServiceMode } from "typescript";
import { useNavigate } from "react-router-dom";
import { Follow } from "../buttons/Follow";
import { UnFollow } from "../buttons/UnFollow";
import { DeleteFollowReq } from "../buttons/DeleteFollowReq";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { DeleteCloseFriend } from "../buttons/DeleteCloseFriend";
interface IProps {
  username: string;
  imageUrl: string;
  fName: string;
  lName: string;
  followersCount: number;
  relationState: string;
}
export const UserCard: React.FC<IProps> = ({
  username,
  imageUrl,
  fName,
  lName,
  followersCount,
  relationState,
}) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${username}`);
  };

  // swich case
  const buttonType = () => {
    {
      switch (relationState) {
        case "notFollowed":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-3 px-10  bg-[#EA5A69] rounded-[100px] text-white"
            >
              <Follow user={username} />
            </div>
          );
        case "follow":
          return (
            <div
              className="relative flex items-center text-xs font-semibold
          py-4 px-16  bg-white rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
            >
              دنبال نکردن
              <div className="absolute top-[-10px] opacity-0 right-[-16px] py-4 px-16 z-50">
                <UnFollow user={username} />;
              </div>
            </div>
          );
        case "friend":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-2 px-5 bg-white  rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
            >
              <DeleteCloseFriend user={username} relation={"friend"} />
            </div>
          );
        case "requestedFollow":
          return (
            <div
              className="relative flex items-center text-xs font-semibold
            py-4 px-16  bg-white rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
            >
              حذف درخواست
              <div className="absolute top-[-10px] opacity-0 right-[-16px] py-4 px-16 z-50">
                <DeleteFollowReq user={username} />
              </div>
            </div>
          );
        case "gotBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-4 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        case "twoWayBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-4 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        default:
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-4 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
      }
    }
  };
  useEffect(() => {
    buttonType();
  }, [relationState]);

  return (
    <>
      <div className="flex-col mt-4 p-8 border border-solid border-[#A5A5A5] rounded-3xl">
        <div className="flex">
          <button onClick={() => visitProfile()}>
            <img
              className="border rounded-full ml-7 w-[56px] h-[56px]"
              src={imageUrl}
              alt=""
            />
          </button>
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {username}
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              <p>{followersCount} دنبال کننده</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div>{buttonType()}</div>
        </div>
      </div>
    </>
  );
};
