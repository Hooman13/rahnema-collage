import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { PagesLayout } from "../pages/PagesLayout";
import { BlockUserCard } from "./cards/BlockUserCard";

export const BlockList = () => {
  const { username } = useParams();

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
  const userInfoEndpoint = username ? `${username}` : userName;

  const getBlocklist = () => {
    return BaseApi.get("/user-relations/blocks?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blocklist"],
    queryFn: getBlocklist,
  });

  return (
    <PagesLayout>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/close-friend">
            <button className="text-[#A5A5A5] ml-10">دوستان نزدیک</button>
          </Link>
          |
          <Link to="/block-list">
            <button className=" mr-10">لیست سیاه</button>
          </Link>
        </div>
        <div className="overflow-y-scroll">
          {data?.blocks
            ? Object.values(data.blocks).map(function (
                item: any,
                index: number
              ) {
                return (
                  <BlockUserCard
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
