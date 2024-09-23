import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { createComment } from "../../../api/comments";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";
import { CommentContext } from "./Comments";

interface IProps {
  postId: string;
  parentId: string | null;
}
export const CommentsForm: React.FC<IProps> = ({ postId, parentId }) => {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState("");

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

  const userName = cookieUsername;
  const commentInputRef = useRef(null);
  const { parentCommentId, setParentCommentId } = useContext(CommentContext);
  const commentType = parentCommentId ? "replay" : "comment";
  const mutation = useMutation({
    mutationFn: () => {
      return createComment(postId, {
        type: commentType,
        content: commentInput,
        parentId: parentId,
      });
    },
    onSuccess: () => {
      setCommentInput("");
      setParentCommentId(null);
      queryClient.invalidateQueries({ queryKey: [postId, "postComments"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  const submitComment = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };
  interface IUserInfo {
    bio: string;
    email: string;
    fName: string;
    imageUrl: string;
    isPrivate: false;
    lName: string;
    username: string;
  }
  const userInfo: IUserInfo | undefined = queryClient.getQueryData([
    userName,
    "userInfo",
  ]);

  return (
    <form
      onSubmit={submitComment}
      className="flex flex-row py-0.5 items-center justify-between mb-4"
    >
      <div className="grow-0">
        <img
          className="w-10 h-10 rounded-full ml-3"
          src={
            userInfo?.imageUrl
              ? process.env.REACT_APP_IMAGE_URL + userInfo?.imageUrl
              : "../img/person.png"
          }
          alt=""
        />
      </div>
      <div className="grow">
        {parentCommentId && (
          <div className="text-xs font-bold text-red-400 bg-cyan-200 p-2 w-5/6">
            <span className="mx-2 w-full">پاسخ به نظر</span>
            <button onClick={() => setParentCommentId(null)}>
              <FontAwesomeIcon
                icon={faXmark}
                className="w-4 h-4 text-zinc-400 left-2 float-right"
              />
            </button>
          </div>
        )}
        <input
          type="text"
          ref={commentInputRef}
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
          required
          className="py-2 px-4 border-zinc-300 border-l rounded-2xl h-9 w-full"
          placeholder="نظر خود را بنویسید ..."
        ></input>
      </div>
      <div className="grow-0">
        <button className="">
          {mutation.isPending ? (
            <Spinner aria-label="Loading..." size="sm"></Spinner>
          ) : (
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="w-6 h-6 text-red-400"
            />
          )}
        </button>
      </div>
    </form>
  );
};
