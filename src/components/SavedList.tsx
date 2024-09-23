import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { PostItemSkeleton } from "./PostItemSkeleton";
import Cookies from "js-cookie";
import { PostItem } from "./PostItem";

export const SavedList = () => {
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
  const getBookmarks = () => {
    return BaseApi.get("/dashboard/bookmarks?c=100", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["saved"],
    queryFn: getBookmarks,
  });

  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {skeletonArray.map((item, index) => {
          return <PostItemSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (isError) {
    return <h1>خطا:{error.message}</h1>;
  }

  if (data.length == 0)
    return (
      <div className="flex-row text-center justify-center items-center">
        <div className="mb-8 text-4xl font-bold">هنوز پستی ذخیره نکردی!</div>
        <div className="text-xl font-base mb-8">
          اینجا تمام پست‌هایی که ذخیره کردی رو می‌تونی ببینی.
        </div>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {data.map(function (item: any, index: any) {
          return (
            <PostItem
              key={index}
              id={item.postId}
              imgUrl={process.env.REACT_APP_IMAGE_URL + item.imageInfo.url}
            />
          );
        })}
      </div>
    </>
  );
};
