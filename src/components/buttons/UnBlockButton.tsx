import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Follow } from "./Follow";

interface IUser {
  user: string;
}

export const UnBlockButton: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const queryClient = useQueryClient();

  const profileUsername = user;

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

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL + "user-relations/blocks/" + user,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.info(`${user} دیگه توی لیست سیاه تو نیست`);
    },
    onError: () => {
      toast.error("متاسفانه درخواست شما انجام نشد");
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: [user, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
    queryClient.invalidateQueries({ queryKey: ["userSearch"] });
    queryClient.invalidateQueries({ queryKey: ["blocklist"] });
  }, [mutation.isSuccess]);

  const handleBlock = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  // swich case
  const buttonType = (relation: string | undefined) => {
    {
      switch (relation) {
        case "blocked":
          return <div>قبلا بلاک کردی</div>;
        default:
          return (
            <button
              onClick={handleBlock}
              type="button"
              className="flex px-4 py-2 text-xs"
            >
              <FontAwesomeIcon icon={faUserLock} />
              <div className="mr-2">بلاک کردن</div>
            </button>
          );
      }
    }
  };

  return (
    <>
      <section>
        <button
          onClick={handleBlock}
          type="button"
          className="flex px-4 py-2 text-xs"
        >
          <FontAwesomeIcon icon={faUserLock} />
          <div className="mr-2">آنبلاک کردن</div>
        </button>
      </section>
    </>
  );
};
