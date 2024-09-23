import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { AcceptedFollowNotifCard } from "../components/cards/AcceptedFollowNotifCard";
import { PagesLayout } from "./PagesLayout";
import { LikeNotifCard } from "../components/cards/LikeNotifCard";
import { MentionCard } from "../components/cards/MentionCard";
import { FollowedByNotifCard } from "../components/cards/FollowedByNotifCard";
import { IncommingReqNotifCard } from "../components/cards/IncommingReqNotifCard";
import { useQuery } from "@tanstack/react-query";

export const Notifs = () => {
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

  const { username } = useParams();
  const userName = cookieUsername;
  const userInfoEndpoint = username ? `${username}` : userName;

  const getNotifs = () => {
    return BaseApi.get("/dashboard/notif?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myNotifs"],
    queryFn: getNotifs,
  });

  // swich case
  const notifsType = (notif: any) => {
    {
      switch (notif.type) {
        case "like":
          return (
            <LikeNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        case "mention":
          return (
            <MentionCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        case "accepedFollow":
          return (
            <AcceptedFollowNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
            />
          );
        case "followedBy":
          return (
            <FollowedByNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              followState={notif.followState}
            />
          );
        case "incommingReq":
          return (
            <IncommingReqNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <PagesLayout>
      <p className="text-xl font-semibold sticky z-50 top-[20px] mb-3">
        اعلانات
      </p>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/notifs">
            <button className=" ml-10">اعلانات من </button>
          </Link>
          |
          <Link to="/friends-notifs">
            <button className="text-[#A5A5A5] mr-10">اعلانات دوستان من</button>
          </Link>
        </div>
        <div className="overflow-y-scroll">
          {data?.notifs
            ? Object.values(data.notifs).map(function (notif, index) {
                return notifsType(notif);
              })
            : null}
        </div>
      </div>
    </PagesLayout>
  );
};
