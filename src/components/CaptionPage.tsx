import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { EditPostContext } from "./post/edit/Modal";

const FormSchema = z.object({
  caption: z.string().optional(),
});

type IFormInput = z.infer<typeof FormSchema>;

export const CaptionPage = () => {
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
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
                  value={postData.caption}
                  onChange={({ target }) => {
                    setPostData({
                      ...postData,
                      caption: target.value,
                    });
                  }}
                />
              </div>
            </div>
            {/* caption page end */}
          </div>
        </section>
      </form>
    </>
  );
};
