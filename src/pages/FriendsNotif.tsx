import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { FLikeNotifCard } from "../components/cards/FLikeNotifCard";
import { CommentNotifCard } from "../components/cards/CommentNotifCard";
import { PagesLayout } from "./PagesLayout";
import { FreindFoCard } from "../components/cards/FreindFoCard";
import { useQuery } from "@tanstack/react-query";

export const FriendsNotif = () => {
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
  const profileUsername = cookieUsername;

  const userName = cookieUsername;
  const { username } = useParams();

  const userInfoEndpoint = username ? `${username}` : userName;

  const getNotifs = () => {
    return BaseApi.get("/dashboard/friend-notif?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friendsNotifs"],
    queryFn: getNotifs,
  });

  // swich case
  const notifsType = (notif: any) => {
    {
      switch (notif.type) {
        case "like":
          return (
            <FLikeNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              postId={notif.postId}
            />
          );
        case "follow":
          return (
            <FreindFoCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              friendUser={notif.friendUser}
              followState={notif.followState}
            />
          );
        case "comment":
          return (
            <CommentNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <PagesLayout>
      <p className="text-xl font-semibold mb-3">اعلانات</p>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/notifs">
            <button className="text-[#A5A5A5] ml-10">اعلانات من </button>
          </Link>
          |
          <Link to="/friends-notifs">
            <button className=" mr-10">اعلانات دوستان من</button>
          </Link>
        </div>
      </div>
      <div className="overflow-y-scroll">
        {data?.notifs
          ? Object.values(data.notifs).map(function (notif) {
              return notifsType(notif);
            })
          : null}
      </div>
    </PagesLayout>
  );
};
