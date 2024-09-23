import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { PagesLayout } from "../pages/PagesLayout";
import { CloseFriendCard } from "./cards/CloseFriendCard";

export const CloseFriendList = () => {
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
  const userName = cookieUsername;

  const { username } = useParams();

  const userInfoEndpoint = username ? `${username}` : userName;

  const getClosefriend = () => {
    return BaseApi.get("/user-relations/friends?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["closefriend"],
    queryFn: getClosefriend,
  });

  return (
    <PagesLayout>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/close-friend">
            <button className=" ml-10">دوستان نزدیک</button>
          </Link>
          |
          <Link to="/block-list">
            <button className="text-[#A5A5A5] mr-10">لیست سیاه</button>
          </Link>
        </div>
        <div className="overflow-y-scroll">
          {data?.friends
            ? Object.values(data.friends).map(function (
                item: any,
                index: number
              ) {
                return (
                  <CloseFriendCard
                    username={item.username}
                    followersCount={item.followersCount}
                    relationStatus={item.relationStatus}
                    imageUrl={
                      item.imageUrl
                        ? process.env.REACT_APP_IMAGE_URL + item.imageUrl
                        : "../img/person.png"
                    }
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </PagesLayout>
  );
};
