import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface IUser {
  user: string;
}

export const RemoveFollowing: React.FC<PropsWithChildren<IUser>> = ({
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
          "user-relations/followings/" +
          user,
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
      toast.info(`${user} رو دیگه دنبال نمیکنی`);
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
          className="flex px-4 py-2 text-xs"
        >
          <FontAwesomeIcon icon={faUserMinus} />
          <div className="mr-2">حذف از دنبال‌شونده‌ها</div>
        </button>
      </section>
    </>
  );
};
