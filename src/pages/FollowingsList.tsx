import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { Button, Modal } from "flowbite-react";
import { FollowingCard } from "../components/cards/FollowingCard";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FollowingsList: React.FC<IProps> = ({
  openModal,
  setOpenModal,
}) => {
  // interface IUser {
  //   username: string;
  //   followersCount: number;
  //   imageUrl: string;
  // }
  // interface IUsers extends Array<IUser> {}
  const modalSize = "md";

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
  const { username } = useParams();

  const userInfoEndpoint = username ? `${username}` : userName;

  const getFollowingsData = () => {
    return BaseApi.get(
      "/user-relations/followings/" + userInfoEndpoint + "?c=100",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      return res.data.followings;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["FollowingsList"],
    queryFn: getFollowingsData,
  });

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={modalSize}
      >
        <Modal.Body>
          <section>
            <form>
              <div className=" bg-white w-auto h-auto py-3 rounded-3xl mt-3 px-3">
                <div className="flex justify-center pb-10 text-xl font-bold text-[#191919]">
                  دنبال شونده ها
                </div>
                <div>
                  {data
                    ? Object.values(data).map(function (user: any, index) {
                        return (
                          <FollowingCard
                            username={user.username}
                            followersCount={user.followersCount}
                            imageUrl={
                              user.imageUrl
                                ? user.imageUrl
                                : "../img/person.png"
                            }
                          ></FollowingCard>
                        );
                      })
                    : null}
                </div>
                <div className="flex items-center justify-end text-sm">
                  <div className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                    <button onClick={() => setOpenModal(false)}>بستن</button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};
