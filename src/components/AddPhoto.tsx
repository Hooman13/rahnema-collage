import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
  faCirclePlus,
  faCircleXmark,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import Cookies from "js-cookie";
import { CaptionPage } from "./CaptionPage";
import { EditPostContext } from "./post/edit/Modal";

const FormSchema = z.object({
  deletedImages: z.string().optional(),
});
type IFormInput = z.infer<typeof FormSchema>;
interface IImage {
  imageId: string;
  url: string;
}

export const AddPhoto = () => {
  const [showResults, setShowResults] = React.useState(false);

  const onClick = () => setShowResults(true);

  const {
    postData,
    setPostData,
    deletedImages,
    setDeletedImages,
    files,
    setFiles,
  } = useContext(EditPostContext);

  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const handleOnChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const selectedPhotos = target.files;
    const selectedPhotosArray = Array.from(selectedPhotos);

    setFiles(selectedPhotosArray);
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onClick)}>
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
                {postData?.imageInfos &&
                  postData.imageInfos.map((file: IImage, index: number) => {
                    return (
                      <div key={index} className="relative mr-2">
                        <img
                          className="flex relative items-center justify-center  rounded-2xl w-[70px] h-[70px] border-2"
                          src={process.env.REACT_APP_IMAGE_URL + file.url}
                          alt=""
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setDeletedImages([
                              ...deletedImages,
                              { url: file.url, imageId: file.imageId },
                            ]);
                            setPostData({
                              ...postData,
                              imageInfos: postData.imageInfos.filter(
                                (image) => image !== file
                              ),
                            });
                            // setPostData({
                            //   imageInfos: postData.imageInfos.filter((image) => image == )
                            // });
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
                            setFiles(files.filter((e) => e === file));
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
            {/* addphoto page end */}
          </div>
        </form>
      </section>
    </>
  );
};
