import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { ExploreItem } from "./ExploreItem";
import { ExploreItemSkeleton } from "./ExploreItemSkeleton";
import Cookies from "js-cookie";

export const ExploreList = () => {
  const selectedAccount = Cookies.get("selectedAccount");
  const currentTokenCookie = Cookies.get("token");
  const token =
    currentTokenCookie && selectedAccount
      ? JSON.parse(currentTokenCookie)[parseInt(selectedAccount)]
      : null;

  const getPosts = () => {
    return BaseApi.get("/dashboard/explore?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["explore"],
    queryFn: getPosts,
  });

  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {skeletonArray.map((item, index) => {
          return <ExploreItemSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (isError) {
    return <h1>خطا:{error.message}</h1>;
  }

  if (data.length == 0)
    return (
      <div className="flex-row items-end text-center">
        <div className="mb-8 text-4xl font-bold">
          سلام به کالج‌گرام خوش اومدی!
        </div>
        <div className="text-xl font-base mb-8">
          برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
          آماده‌ای؟
        </div>
        <div className="flex justify-center">
          <button
            className="text-center flex border-solid text-white rounded-3xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center py-[16px] px-8"
            type={"submit"}
          >
            جستجوی کالج‌گرامی‌ها
          </button>
        </div>
      </div>
    );

  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {data.map(function (item: any, index: any) {
            return (
              <ExploreItem
                postId={item.postId}
                postImage={process.env.REACT_APP_IMAGE_URL + item.postImage}
                key={index}
                userAvatar={item.creator.imageUrl}
                userName={item.creator.username}
                userFName={item.creator.fullname}
                bookmarkCount={item.bookmarkCount}
                commentCount={item.commentCount}
                isBookmarked={item.isBookmarked}
                isLiked={item.isLiked}
                likeCount={item.likeCount}
                userFollowersCount={item.creator.followersCount}
              ></ExploreItem>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
          <div className="flex flex-row min-h-screen justify-center items-center">
            پستی برای نمایش وجود ندارد
          </div>
        </div>
      )}
    </>
  );
};
