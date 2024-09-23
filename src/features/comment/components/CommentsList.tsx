import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BaseApi } from "../../../api/axios";
import Cookies from "js-cookie";
import { CommentsItem } from "./CommentsItem";
import { Spinner } from "flowbite-react";

interface IProps {
  postId: string;
}
export const CommentsList: React.FC<IProps> = ({ postId }) => {
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

  const getPostComments = () => {
    return BaseApi.get(`/posts/${postId}/comments?c=1000`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data.comments;
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [postId, "postComments"],
    queryFn: getPostComments,
  });

  if (isLoading) return <Spinner aria-label="Loading..." size="sm"></Spinner>;
  if (isError) return <>خطا : {error.message}</>;
  return (
    <>
      {data?.length ? (
        data.map((item: any, index: any) => {
          return (
            <CommentsItem
              key={index}
              commentId={item.commentId}
              postId={postId}
              content={item.content}
              createdAt={item.createDate}
              likeCount={item.likeCount}
              parentId={null}
              username={item.commentor.username}
              replays={item.replays}
            />
          );
        })
      ) : (
        <div className="w-full font-normal text-xs text-center text-zinc-900">
          کامنتی وجود ندارد
        </div>
      )}
    </>
  );
};
