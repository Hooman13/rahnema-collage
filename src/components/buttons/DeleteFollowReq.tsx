import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

interface IUser {
  user: string;
}

export const DeleteFollowReq: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
        process.env.REACT_APP_API_BASE_URL +
          "user-relations/follow/" +
          user +
          "/req",
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
      toast.info(`درخواستت دنبال کردنت از ${user} حذف شد`);
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
  }, [mutation.isSuccess]);

  const handleDeleteFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <section>
        <button
          onClick={handleDeleteFollow}
          type="button"
          className="text-xs font-semibold py-1 px-6 rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
        >
          حذف درخواست
        </button>
      </section>
    </>
  );
};
