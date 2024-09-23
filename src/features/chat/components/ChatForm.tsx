import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { BaseApi } from "../../../api/axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IUserInfo } from "../../../data/types";
interface IProps {
  ReciverUsername: string;
}
export const ChatForm: React.FC<IProps> = ({ ReciverUsername }) => {
  const queryClient = useQueryClient();
  const [msgInput, setMsgInput] = useState("");

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
  const msgInputRef = useRef(null);


  const mutation = useMutation({
    mutationFn: (formdata: FormData) => {
      return BaseApi.post(`/dashboard/messages/${ReciverUsername}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      setMsgInput("");
      setFile(undefined);
      queryClient.invalidateQueries({ queryKey: ["pv", ReciverUsername] });
    },
    onError: (error) => {
      toast.error("خطا در ارسال پیام : " + error)
    },
  });
  const [file, setFile] = useState<File>();

  const submitMessage = (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    if (file) {
      formdata.append("image", file);
    } else {
      formdata.append("content", msgInput);
    }
    mutation.mutate(formdata);
  };

  const userInfo: IUserInfo | undefined = queryClient.getQueryData([
    userName,
    "userInfo",
  ]);

  const handleOnChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    setFile(target.files[0]);
  };
  return (
    <>
      <form
        onSubmit={submitMessage}
        className="flex flex-row py-0.5 items-center  mb-4 w-full gap-2"
      >
        <div className="flex-none">
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
        <div className="flex-none">
          <label htmlFor="upload-photo" className="cursor-pointer">
            <FontAwesomeIcon
              icon={faImage}
              className="w-8 h-8 cursor-pointer text-zinc-300 "
            />
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/png,image/jpg"
            onChange={handleOnChangePhoto}
            className="opacity-0 display-none w-2 h-6"
          />
        </div>
        <div className="flex-auto">
          {file ? (
            <div className="relative  w-[70px] h-[70px]">
              <img
                className="flex  items-center justify-center w-auto h-full rounded-2xl border-2"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500 bg-white rounded-full w-5 h-5"
                onClick={(e) => {
                  e.preventDefault();
                  setFile(undefined);
                }}
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          ) : (
            <input
              type="text"
              ref={msgInputRef}
              value={msgInput}
              onChange={(e) => {
                setMsgInput(e.target.value);
              }}
              className="py-2 px-4 border-zinc-300 border-l rounded-2xl h-9 w-full"
              placeholder="نظر خود را بنویسید ..."
            ></input>
          )}
        </div>
        <div className="flex-none">
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
    </>
  );
};
