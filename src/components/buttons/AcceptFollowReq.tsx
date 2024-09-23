import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface IUser {
  user: string;
}

export const AcceptFollowReq: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const [followAccepted, setFollowAccepted] = useState(true);
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
  const profileUsername = cookieUsername;

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL + "user-relations/follow/" + user,
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
      toast.info(`درخواست ${user} رو قبول کردی`);
    },
    onError: () => {
      toast.error("متاسفانه درخواست شما انجام نشد");
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: [user, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["userSearch"] });
    queryClient.invalidateQueries({ queryKey: ["FollowersList"] });
    queryClient.invalidateQueries({ queryKey: ["FollowingsList"] });
  }, [mutation.isSuccess]);

  const handleAcceptFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <section>
        {followAccepted && (
          <button
            onClick={handleAcceptFollow}
            type="button"
            className="text-xs font-semibold py-1 px-6 bg-[#EA5A69] rounded-[100px] text-white"
          >
            قبولهههه
          </button>
        )}
      </section>
    </>
  );
};
