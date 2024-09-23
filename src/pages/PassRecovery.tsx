import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EmailSent } from "./EmailSent";

const FormSchema = z.object({
  email: z.string().email("ایمیل وارد شده نامعتبر است").optional(),
});

type IFormInput = z.infer<typeof FormSchema>;

export const PassRecovery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();
  const handleEmailSent = () => {
    navigate("/email-sent-page");
  };
  const onSubmit = (data: IFormInput) => {
    axios
      .post("http://37.32.5.72:3000/auth/send-reset", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          handleEmailSent();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[485px] h-screen md:h-auto py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="text-xl mb-12 justify-evenly flex">
                بازیابی رمز عبور
              </div>
              <div className="text-sm text-right mb-8">
                لطفاً ایمیل خودتون رو وارد کنید
              </div>
              <div className="text-xs mt-6 mb-6">
                <input
                  type="text"
                  dir="ltr"
                  {...register("email")}
                  placeholder="ایمیل"
                  className="border rounded-2xl w-full text-right text-base  px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                {errors?.email?.message && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </div>
              <div className="flex items-center text-sm">
                <div>
                  <button
                    className="text-center mr-1  text-white flex border-solid rounded-2xl bg-[#EA5A69] w-[181px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
                    type={"submit"}
                  >
                    ارسال لینک بازیابی رمز عبور
                  </button>
                </div>
                <div className="flex pr-5">
                  <Link to="/login">
                    <button>انصراف</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
