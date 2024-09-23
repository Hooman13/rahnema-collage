import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IUser {
  user: string;
}

export const Follow: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL +
          "user-relations/follow/" +
          user +
          "/req",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      toast.info(`درخواست دنبال کردن ${user} براش ارسال شد`);
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
    queryClient.invalidateQueries({ queryKey: ["friendsNotifs"] });
    queryClient.invalidateQueries({ queryKey: ["FollowersList"] });
    queryClient.invalidateQueries({ queryKey: ["FollowingsList"] });
  }, [mutation.isSuccess]);

  const handleFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <section>
        <button
          onClick={handleFollow}
          type="button"
          className="flex items-center text-xs font-semibold py-1 px-5 bg-[#EA5A69] rounded-[100px] text-white"
        >
          <FontAwesomeIcon className="ml-2" icon={faPlus} />
          دنبال کردن
        </button>
      </section>
    </>
  );
};
