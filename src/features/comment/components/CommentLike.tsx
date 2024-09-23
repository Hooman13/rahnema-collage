import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPostApi } from "../../../api/axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface IProps {
  commentId: string;
  likeCount: number;
  isLiked: boolean;
}
export const CommentLike: React.FC<IProps> = ({
  commentId,
  likeCount,
  isLiked,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
  interface ILike {
    likeCount: number;
    isLiked: boolean;
  }
  const [like, setLike] = useState<ILike>({
    likeCount: likeCount,
    isLiked: isLiked,
  });

  useEffect(() => {
    setLike((prevState) => ({
      ...prevState,
      ...{ likeCount, isLiked },
    }));
  }, [likeCount, isLiked]);


  const likeHandle = () => {
    setIsLoading(true);
    DisplayPostApi.post(
      `/comments/${commentId}/like`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        debugger;
        const isLiked_result = res.data.message === "liked comment";
        const likeCount_result = res.data.likeCount;

        setLike((prevState) => ({
          ...prevState,
          likeCount: likeCount_result,
          isLiked: isLiked_result,
        }));
      })
      .catch((e) => {
        toast.error("خطا در لایک")
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex-none w-9 gap-2 relative">

      <button
        onClick={() => {
          likeHandle();
        }}
      >
        {isLoading && <Spinner size="sm" className="absolute"></Spinner>}
        {like.isLiked ? (
          <FontAwesomeIcon icon={solidHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
      </button>
      <span className="inline-block mr-2">{like.likeCount}</span>
    </div>
  );
};
