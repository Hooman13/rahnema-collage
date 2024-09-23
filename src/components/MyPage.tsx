import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { UserInfoApi } from "../api/axios";
import { PostsList } from "./PostList";
import { Follow } from "./buttons/Follow";
import { UnFollow } from "./buttons/UnFollow";
import { FollowersList } from "../pages/FollowersList";
import { FollowingsList } from "../pages/FollowingsList";
import { EditProfile } from "../pages/EditProfile";
import { DeleteFollowReq } from "./buttons/DeleteFollowReq";
import { useQuery } from "@tanstack/react-query";
import { MyPageSkeleton } from "./MyPageSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { RelationButton } from "./buttons/RelationButton";

export const MyPage = () => {
  const { username } = useParams();
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openEditProfilModal, setOpenEditProfilModal] = useState(false);
  // const cookieUsername = Cookies.get("username");

  const [isMyProfile, setIsMyProfile] = useState(false);

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
  const profileUsername = username ? `${username}` : cookieUsername;

  const getProfileData = () => {
    return UserInfoApi.get(profileUsername ?? "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [profileUsername, "userInfo"],
    queryFn: getProfileData,
  });

  const checkMyProfile = () => {
    if (cookieUsername === data?.username) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [profileUsername]);
  useEffect(() => {
    checkMyProfile();
  }, [data]);

  // swich case
  const buttonType = (data: any) => {
    {
      switch (data?.relationState) {
        case "notFollowed":
          return <Follow user={data?.username} />;
        case "follow":
          return <UnFollow user={data?.username} />;
        case "requestedFollow":
          return <DeleteFollowReq user={data?.username} />;
        // case "blocked":
        //   return <UnBlock user={data?.username} />;
        case "gotBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-1 px-5 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        case "twoWayBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
              py-1 px-5 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        default:
          return null;
      }
    }
  };
  useEffect(() => {
    buttonType(data);
  }, [data?.relationState]);

  return (
    <>
      <div>
        {/* profile informations */}
        <div className="text-black border-b-2 z-50 border-[#CAC4D0] bg-[#F5F5F5] sticky top-[64px] pb-3">
          <div className="flex justify-between">
            {isLoading ? (
              <MyPageSkeleton />
            ) : (
              <div className="flex items-center">
                <img
                  className="border rounded-full w-[105px] h-[105px]"
                  src={
                    data?.imageUrl
                      ? process.env.REACT_APP_IMAGE_URL + data?.imageUrl
                      : "../img/person.png"
                  }
                  alt=""
                />
                <div className="grid grid-rows-3 h-[105px] mr-4">
                  <div className="flex">
                    <div className="user-full-name text-base ml-4 text-[#191919]">
                      <span className="text-xl font-bold">
                        {data?.fName} {data?.lName}
                      </span>
                      <span className="text-base font-normal mr-4 ">
                        {data?.username}@
                      </span>
                    </div>
                    <div className="ml-4">
                      {!isMyProfile && buttonType(data)}
                    </div>
                  </div>
                  <div className="text-base font-normal flex ">
                    <div className="user-followers-details pl-2 text-[#C19008]">
                      {data?.followersCount}
                      <button
                        onClick={() => {
                          setOpenFollowersModal(true);
                        }}
                      >
                        <span className="mx-1">دنبال کننده</span>
                      </button>
                    </div>
                    |
                    <div className="user-followers-details px-2 text-[#C19008]">
                      {data?.followingsCount}
                      <button
                        onClick={() => {
                          setOpenFollowingsModal(true);
                        }}
                      >
                        <span className="mx-1">دنبال شونده</span>
                      </button>
                    </div>
                    |
                    <div className="user-followers-details pr-2">
                      {data?.postCount}
                      <span className="mx-1">پست</span>
                    </div>
                  </div>
                  <div className="user-followers-details text-sm font-normal w-[377px] text-[#A5A5A5]">
                    {data?.bio}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center">
              {!isMyProfile && (
                <div className="flex">
                  {!isMyProfile && (
                    <RelationButton
                      user={data?.username}
                      relation={data?.relationState}
                      fullname={data?.fName + data?.lName}
                      imgUrl={data?.imageUrl}
                    />
                  )}
                </div>
              )}
              {isMyProfile && (
                <button
                  type="button"
                  className="text-sm px-6 lg:px-10 py-2 w-max bg-[#EA5A69] rounded-3xl text-white "
                  onClick={() => {
                    setOpenEditProfilModal(true);
                  }}
                >
                  ویرایش پروفایل
                </button>
              )}
            </div>
          </div>
        </div>
        {/* posts place */}
        <div className="z-0 bg-inherit py-5">
          <PostsList username={profileUsername} />
        </div>
      </div>
      <FollowersList
        openModal={openFollowersModal}
        setOpenModal={setOpenFollowersModal}
      />
      <FollowingsList
        openModal={openFollowingsModal}
        setOpenModal={setOpenFollowingsModal}
      />
      <EditProfile
        openModal={openEditProfilModal}
        setOpenModal={setOpenEditProfilModal}
      />
    </>
  );
};
