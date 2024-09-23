import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ExploreItemSkeleton } from "../components/ExploreItemSkeleton";
import { ExploreItem } from "../components/ExploreItem";
import { PeopleSkeleton } from "../components/PeopleSkeleton";
import { UserCard } from "../components/cards/UserCard";
import React, { useState, PropsWithChildren } from "react";

interface IUser {
  user: string;
}

export const SearchPeaple: React.FC<PropsWithChildren<IUser>> = ({
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
  // const profileUsername = username ? `${username}` : cookieUsername;
  const getPosts = () => {
    return BaseApi.get("/dashboard/search-users?s=" + user + "&c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data.users;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userSearch"],
    queryFn: getPosts,
  });

  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {skeletonArray.map((item, index) => {
          return <PeopleSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (isError) {
    return <h1>خطا:{error.message}</h1>;
  }

  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {data.map(function (item: any, index: any) {
            return (
              <UserCard
                username={item.username}
                imageUrl={
                  item.imageUrl
                    ? process.env.REACT_APP_IMAGE_URL + item.imageUrl
                    : "../img/person.png"
                }
                fName={item.fName}
                lName={item.lName}
                followersCount={item.followersCount}
                relationState={item.relationState}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
          <div className="flex flex-row min-h-screen justify-center items-center">
            پستی برای نمایش وجود ندارد
          </div>
        </div>
      )}
    </>
  );
};
