import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatBubble } from "./ChatBubble";
import { getMessage } from "../../../api/chat";
import { IMessage } from "../../../data/types";
import { ChatBubbleSkeleton } from "./ChatBubbleSkeleton";
import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

interface IProps {
  username: string;
  imgUrl?: string;
  fullname?: string;
}

export const Chat: React.FC<IProps> = ({ username, imgUrl, fullname }) => {
  const queryClient = useQueryClient();
  const socket = io(process.env.REACT_APP_API_SOCKET_URL as string, {
    autoConnect: false,
    secure: true,
  });

  socket.on("connect_error", (err) => {
    // console.log("connect_error : " + err);
  });

  socket.on("connect", () => {
    // console.log(socket.id);
  });

  socket.on("disconnect", () => {
    // console.log(socket.id);
  });

  socket.on("error", (err) => {
    // console.log("error : " + err);
  });

  socket.on("pvMessage", (message) => {
    queryClient.invalidateQueries({ queryKey: ["pv", username] });
  });

  useEffect(() => {
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
    const jwt = token;

    socket.auth = { jwt };
    socket.connect();
    socket.emit("pvConnect", username);
  }, []);

  const getPvChats = () => {
    return getMessage(username).then((res) => {
      return res?.reverse();
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pv", username],
    queryFn: getPvChats,
  });

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      (lastMessageRef.current as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [lastMessageRef]);
  const skeletonArray = new Array(5).fill("");
  if (isLoading) {
    return (
      <>
        {skeletonArray.map((item, index) => {
          return <ChatBubbleSkeleton key={index} />;
        })}
      </>
    );
  }

  if (isError) {
    return <h1>خطا:{error.message}</h1>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        {data?.map((item: IMessage, index: number) => {
          return (
            <ChatBubble
              key={index}
              content={item.content}
              createdAt={item.createdAt}
              isOwned={item.isOwned}
              messageId={item.messageId}
              image={item.image}
              username={username}
              imgUrl={imgUrl}
              fullname={fullname}
            />
          );
        })}
        <div ref={lastMessageRef} className="invisible h-0"></div>
      </div>
    </>
  );
};
