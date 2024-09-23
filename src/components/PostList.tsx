import { PropsWithChildren, useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { PostListApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { PostItemSkeleton } from "./PostItemSkeleton";
interface IPostListProps {
  username: string | undefined;
}
export const PostsList: React.FC<PropsWithChildren<IPostListProps>> = ({
  username,
  children,
}) => {
  const selectedAccount = Cookies.get("selectedAccount");
  const currentTokenCookie = Cookies.get("token");
  const token =
    currentTokenCookie && selectedAccount
      ? JSON.parse(currentTokenCookie)[parseInt(selectedAccount)]
      : null;

  const getUserPosts = () => {
    return PostListApi.get(`${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.data.posts;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`userPostList-${username}`],
    queryFn: getUserPosts,
  });

  useEffect(() => {
    if (username) {
      getUserPosts();
    }
  }, [username]);

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
    return (
      <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
        <div className="flex flex-row min-h-screen justify-center items-center">
          <p>نمیتونی پستای {username} رو ببینی! </p>
        </div>
      </div>
    );
  }
  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {data.map(function (item: any, index: any) {
            return (
              <PostItem
                id={item.postId}
                imgUrl={process.env.REACT_APP_IMAGE_URL + item.imageInfo.url}
                key={index}
              ></PostItem>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
          <div className="flex flex-row min-h-screen justify-center items-center">
            هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
          </div>
        </div>
      )}
    </>
  );
};
