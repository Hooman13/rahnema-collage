import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { EditPostContext } from "./post/edit/Modal";

const FormSchema = z.object({
  mentions: z.array(z.string()).optional(),
});

type IFormInput = z.infer<typeof FormSchema>;

export const MentionPost = () => {
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
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });
  const { postData, setPostData } = useContext(EditPostContext);

  if (!postData) return <></>;
  return (
    <>
      <form>
        <section>
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
                  value={postData.mentions}
                  onChange={({ target }) => {
                    let mentions = getValues("mentions");
                    if (mentions != undefined) {
                      mentions.push(target.value);
                    } else {
                      mentions = [target.value];
                    }
                    setPostData({
                      ...postData,
                      mentions: mentions,
                    });
                  }}
                  // onChange={() => {
                  //   setValue("mentions", target.value);
                  // }}
                  dir="ltr"
                />
              </div>
            </div>
            {/* buttons */}
            {/* <div className="flex items-center justify-end text-sm">
              <div className="flex pl-5">
                <button onClick={() => setOpenModal(false)}>پشیمون شدم</button>
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
            </div> */}
          </div>
        </section>
      </form>
    </>
  );
};
