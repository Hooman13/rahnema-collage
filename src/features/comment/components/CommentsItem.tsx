import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowsTurnRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TimeAgoDate } from "../../../utils/TimeAgoDate";
import { CommentLike } from "./CommentLike";
import { useContext } from "react";
import { CommentContext } from "./Comments";

interface IProps {
  username: string;
  postId: string;
  content: string;
  parentId: string | null;
  commentId: string;
  createdAt: string;
  likeCount: number;
  replays: [];
}

export const CommentsItem: React.FC<IProps> = ({
  commentId,
  username,
  postId,
  content,
  parentId,
  createdAt,
  likeCount,
  replays,
}) => {
  const { setParentCommentId } = useContext(CommentContext);
  return (
    <>
      <div className={parentId ? "my-2 pr-12" : "my-2"}>
        <div className="flex flex-row py-0.5 items-center">
          <Link
            to={"/profile/" + username}
            rel="author"
            className="basis-1/6 grow text-xs font-bold text-zinc-900"
          >
            {username}
          </Link>
          <div className="basis-1/6 grow text-[10px] font-bold text-neutral-400">
            {createdAt && TimeAgoDate(createdAt)}
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <CommentLike
              commentId={commentId}
              isLiked={false}
              likeCount={likeCount}
            />
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <button
              onClick={() => {
                setParentCommentId(commentId);
              }}
            >
              <span className="ml-2">پاسخ</span>
              <FontAwesomeIcon icon={faArrowsTurnRight} />
            </button>
          </div>
        </div>
        <div className="flex flex-row py-0.5 items-center justify-between">
          <div className="basis-full mt-2 font-normal text-xs text-right text-zinc-900">
            {content}
          </div>
        </div>
      </div>
      {replays?.map((replay: any, index: any) => {
        return (
          <CommentsItem
            key={index}
            commentId={replay.commentId}
            postId={postId}
            content={replay.content}
            createdAt={replay.createDate}
            likeCount={replay.likeCount}
            parentId={commentId}
            username={replay.commentor.username}
            replays={replay.replays}
          />
        );
      })}
    </>
  );
};
