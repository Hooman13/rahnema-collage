import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

interface IUser {
  user: string;
  relation?: string;
}

export const DeleteCloseFriend: React.FC<PropsWithChildren<IUser>> = ({
  user,
  relation,
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
  const profileUsername = user;

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL + "user-relations/friends/" + user,
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
      toast.info(`${user} دیگه دوست نزدیکت نیست`);
    },
    onError: () => {
      toast.error("متاسفانه درخواست شما انجام نشد");
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: [user, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["userSearch"] });
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
    queryClient.invalidateQueries({ queryKey: ["closefriend"] });
  }, [mutation.isSuccess]);

  const handleCloseFriend = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };
  // swich case
  const buttonType = (relation: string | undefined) => {
    {
      switch (relation) {
        case "friend":
          return (
            <section>
              <button
                onClick={handleCloseFriend}
                type="button"
                className="flex px-4 py-2 text-xs"
              >
                <FontAwesomeIcon icon={faUserMinus} />
                <div className="mr-2">حذف از دوستان نزدیک</div>
              </button>
            </section>
          );
        default:
          return null;
      }
    }
  };

  return (
    <>
      <section>{buttonType(relation)}</section>
    </>
  );
};
