import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPostApi } from "../api/axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface IProps {
  postId: string;
  bookMarkCount: number;
  isBookMarked: boolean;
  type: "post" | "explore";
}
export const PostBookmark: React.FC<IProps> = ({
  postId,
  bookMarkCount,
  isBookMarked,
  type,
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
  interface IBookmark {
    bookMarkCount: number;
    isBookMarked: boolean;
  }
  const [bookmark, setBookmark] = useState<IBookmark>({
    bookMarkCount: bookMarkCount,
    isBookMarked: isBookMarked,
  });

  useEffect(() => {
    setBookmark((prev) => ({
      ...prev,
      bookMarkCount,
      isBookMarked,
    }));
  }, [bookMarkCount, isBookMarked]);


  const bookmarkHandle = () => {
    setIsLoading(true);
    DisplayPostApi.post(
      `/${postId}/bookmark`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        const isBookmard_res = res.data.message == "bookmarked post";
        const bookMarkCount_res = res.data.bookmarkCount;
        setBookmark((prev) => ({
          ...prev,
          bookMarkCount: bookMarkCount_res,
          isBookMarked: isBookmard_res,
        }));
      })
      .catch((e) => {
        toast.error("خطا در ذخیره پست :"  + e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="flex-none w-9 gap-2 relative">
      <button
        onClick={() => {
          bookmarkHandle();
        }}
      >
        {isLoading && <Spinner size="sm" className="absolute"></Spinner>}
        {bookmark.isBookMarked ? (
          <FontAwesomeIcon icon={solidBookmark} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} />
        )}
      </button>

      <span className={type == "post" ? "block" : "inline-block mr-2"}>
        {bookmark.bookMarkCount}
      </span>
    </div>
  );
};
