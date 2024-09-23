import { useState } from "react";
import { PostModal } from "./PostModal";
import { PostLike } from "./PostLike";
import { PostBookmark } from "./PostBookmark";
import { PostComment } from "./PostComment";
import { UserAvatar } from "./UserAvatar";
interface IProps {
  postId: string;
  postImage: string;
  userAvatar: string;
  userName: string;
  userFName: string;
  userFollowersCount: number;
  commentCount: number;
  likeCount: number;
  bookmarkCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}
export const ExploreItem: React.FC<IProps> = ({
  postId,
  postImage,
  userAvatar,
  userFName,
  userName,
  bookmarkCount,
  commentCount,
  isBookmarked,
  isLiked,
  likeCount,
  userFollowersCount,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <figure
        onClick={() => setOpenModal(true)}
        id={postId}
        className="relative max-w-sm cursor-pointer rounded-3xl border border-neutral-400 hover:shadow-lg aspect-square transition-transform duration-300 transform hover:scale-105 peer"
      >
        <img
          className="rounded-t-3xl aspect-square object-cover w-full"
          src={postImage}
          alt=""
        />

        <figcaption className="bottom-6 w-100">
          <div className="flex flex-row gap-1 items-center py-4 px-6 text-md text-zinc-900">
            <PostComment
              postId={postId}
              commentCount={commentCount}
              type="explore"
            />
            <PostLike
              postId={postId}
              likeCount={likeCount}
              isLiked={isLiked}
              type="explore"
            />
            <PostBookmark
              postId={postId}
              bookMarkCount={bookmarkCount}
              isBookMarked={isBookmarked}
              type="explore"
            />
          </div>
          <div className="py-4 px-4">
            <UserAvatar
              username={userName}
              fullname={userFName}
              imgUrl={userAvatar}
              followersCount={userFollowersCount}
            />
          </div>
        </figcaption>
      </figure>
      {openModal && (
        <PostModal
          postId={postId}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};
