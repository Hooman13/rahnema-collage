import { MessageCard } from "../components/cards/MessageCard";
import { PagesLayout } from "./PagesLayout";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
  unseenCount: number;
  lastMessage: ILastMessage;
}
interface ILastMessage {
  content: string;
  createdAt: string;
}
interface IChat {
  contact: IUsers;
  chatId: string;
}

export const Messages = () => {
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

  const getMessages = () => {
    return BaseApi.get("/dashboard/messages??c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myMessages", userName],
    queryFn: getMessages,
  });

  return (
    <>
      <PagesLayout>
        <p className="text-xl font-semibold sticky z-50 top-[20px] mb-3">
          پیام‌ها
        </p>
        <div className="w-full bg-inherit flex flex-col justify-center cursor-pointer">
          {data &&
            data?.map(function (item: IChat, index: number) {
              return (
                <MessageCard
                  contact={item.contact}
                  chatId={item.chatId}
                  key={index}
                />
              );
            })}
        </div>
      </PagesLayout>
    </>
  );
};
