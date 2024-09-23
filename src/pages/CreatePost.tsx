import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../api/posts";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCamera,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Spinner } from "flowbite-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
const FormSchema = z.object({
  mentions: z.string().optional(),
  caption: z.string().optional(),
  isCloseFriend: z.boolean().optional(),
});
type FormData = z.infer<typeof FormSchema>;

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreatePost: React.FC<IProps> = ({ openModal, setOpenModal }) => {
  const queryClient = useQueryClient();
  // create post
  const [showAddPhoto, setShowAddPhoto] = useState(true);
  const [showCaptionPage, setShowCaptionPage] = useState(false);
  const [showSendPost, setShowSendPost] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();
  // const [modalSize, setModalSize] = useState<string>("lg");
  const modalSize = "md";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const navigate = useNavigate();
  const handlePostSent = () => {
    queryClient.invalidateQueries({ queryKey: [`userPostList-${userName}`] });
    setOpenModal(false);
    navigate("/profile");
  };
  const onSubmit = () => {
    setIsLoading(true);
    if (typeof files === "undefined") return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("caption", formInput.caption);
    let arr = formInput.mentions
      .replaceAll("@", "")
      .split(" ")
      .filter((m) => m !== "");

    for (let i = 0; i < arr.length; i++) {
      formData.append(`mentions[${i}]`, arr[i]);
    }
    formData.append("isCloseFriend", "false");

    createPost(formData)
      .then((response) => {
        if (response?.status === 201) {
          toast.success("پست با موفقیت ارسال شد");
          setTimeout(() => {
            setOpenModal(false);
          }, 2000);
          handlePostSent();
        }
      })
      .catch((err) => {
        toast.error("خطا در ارسال پست : " + err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [formInput, setFormInput] = useState({
    // images: "",
    caption: "",
    mentions: "",
  });

  const handleUserInput = (name: string, value?: string | string[]) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // AddPhoto logic

  const handleOnChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const selectedPhotos = target.files;
    const selectedPhotosArray = Array.from(selectedPhotos);
    setFiles(selectedPhotosArray);
  };

  useEffect(() => {
    setFiles(undefined);
    reset();
    setFormInput({
      caption: "",
      mentions: "",
    });
    setShowAddPhoto(true);
    setShowCaptionPage(false);
    setShowSendPost(false);
  }, [openModal]);

  return (
    <>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={modalSize}
      >
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* addphoto page start */}
            {showAddPhoto && (
              <div>
                {/* The Graph */}
                <div className="flex-row flex justify-evenly px-4 pt-4 ">
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4"></div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      تنظیمات
                    </p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4"></div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      متن
                    </p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                      <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                    </div>
                    <p className="grid row-span-1 text-[10px] mt-1">عکس</p>
                  </div>
                </div>
                {/* main */}
                <div className="text-center mt-8 text-sm font-normal mb-4">
                  <p>عکس‌های مورد نظرت رو آپلود کن:</p>
                </div>
                <div className="flex justify-center mb-8">
                  <div className="flex relative items-center justify-center  rounded-full w-[70px] h-[70px] border-[#F7901E] border-2">
                    <div className="m-auto relative   ">
                      <FontAwesomeIcon
                        className="w-7 h-7"
                        icon={faCamera}
                        style={{ color: "#F7901E" }}
                      />
                      <input
                        type="file"
                        accept="image/png,image/jpg"
                        multiple
                        onChange={handleOnChangePhoto}
                        className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer "
                      />
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className="absolute top-[15px] right-[40px]"
                        icon={faCirclePlus}
                        style={{ color: "#F7901E" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    {files &&
                      files.map((file, index) => {
                        return (
                          <div key={index} className="relative mr-2">
                            <img
                              className="flex relative items-center justify-center  rounded-2xl w-[70px] h-[70px] border-2"
                              src={URL.createObjectURL(file)}
                              alt=""
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setFiles(files.filter((e) => e !== file));
                              }}
                            >
                              <FontAwesomeIcon
                                className="absolute top-[-7px] right-[58px]"
                                icon={faCircleXmark}
                                style={{ color: "#F7901E" }}
                              />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
                {/* buttons */}
                <div className="flex items-center justify-end text-sm">
                  <div className="flex pl-5">
                    <button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      پشیمون شدم
                    </button>
                  </div>
                  <div>
                    <button
                      className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
                      onClick={() => {
                        setShowAddPhoto(!showAddPhoto);
                        setShowCaptionPage(!showCaptionPage);
                      }}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
                {/* addphoto page end */}
              </div>
            )}
            {/* caption page start */}
            {showCaptionPage && (
              <div>
                {/* The Graph */}
                <div className="flex-row flex justify-evenly px-4 py-4 ">
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4"></div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      تنظیمات
                    </p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                      <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                    </div>
                    <p className="grid row-span-1 text-[10px] mt-1">متن</p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4"></div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      عکس
                    </p>
                  </div>
                </div>
                {/* main */}
                <div className="text-center mt-8 text-sm font-normal mb-3">
                  <p>کپشن مورد نظرت رو بنویس:</p>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="text-right text-sm font-bold mb-2 ">
                    <p className="text-[#191919] pb-2">کپشن</p>
                    <textarea
                      className="w-[320px] h-[120px] border solid border-[#17494D]/50 rounded-xl"
                      {...register("caption")}
                      value={formInput.caption}
                      onChange={({ target }) => {
                        handleUserInput(target.name, target.value);
                      }}
                    />
                  </div>
                </div>
                {/* buttons */}
                <div className="flex items-center justify-end ml-5 text-sm">
                  <div className="flex pl-5">
                    <button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      پشیمون شدم
                    </button>
                  </div>
                  <div>
                    <button
                      className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
                      onClick={() => {
                        setShowCaptionPage(!showCaptionPage);
                        setShowSendPost(!showSendPost);
                      }}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
                {/* caption page end */}
              </div>
            )}
            {/* sendpost start */}
            {showSendPost && (
              <div>
                {/* The Graph */}
                <div className="flex-row flex justify-evenly px-4 py-6 ">
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                      <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                    </div>
                    <p className="grid row-span-1 text-[10px] mt-1">تنظیمات</p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4">
                      {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                    </div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      متن
                    </p>
                  </div>
                  <div className="grid grid-rows-2 justify-items-center">
                    <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4">
                      {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                    </div>
                    <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                      عکس
                    </p>
                  </div>
                </div>
                {/* main */}
                <div className="text-center mt-8 text-base font-normal mb-8">
                  <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
                </div>
                <div className="flex justify-center mb-8">
                  <div className="text-right text-sm font-bold mb-6 ">
                    <input
                      className="w-[320px] h-[32px] border solid border-[#17494D]/50 rounded-xl"
                      type="text"
                      {...register("mentions")}
                      value={formInput.mentions}
                      onChange={({ target }) => {
                        handleUserInput(target.name, target.value);
                      }}
                      dir="ltr"
                    />
                  </div>
                </div>
                {/* buttons */}
                <div className="flex items-center justify-end text-sm">
                  <div className="flex pl-5">
                    <button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      پشیمون شدم
                    </button>
                  </div>
                  <div>
                    <button
                      className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[137px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
                      // onClick={() => setShowSendPost(!showSendPost)}
                      type={"submit"}
                    >
                      {!isLoading && <span className="">ثبت و انتشار پست</span>}
                      {isLoading && (
                        <Spinner aria-label="send post" size="sm"></Spinner>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* sendpost end */}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
