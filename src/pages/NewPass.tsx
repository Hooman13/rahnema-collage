import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseApi } from "../api/axios";
import { ToastR } from "../components/controles/ToastR";
import Cookies from "js-cookie";

const FormSchema = z.object({
  newPassword: z.string().min(8, "رمزعبور باید حداقل شامل ۸ حرف باشد"),
  confirmPassword: z.string().min(8),
});

type IFormInput = z.infer<typeof FormSchema>;

export const NewPass = () => {
  // reset pass logic
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const selectedAccount = Cookies.get("selectedAccount");
  const currentTokenCookie = Cookies.get("token");
  const paramTokenSearch =
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

  const [token, setToken] = useState("");
  const [serachParams] = useSearchParams();
  const paramSearch: any = serachParams.get("email");
  // const paramTokenSearch: any = serachParams.get("token");
  // const { token } = useParams();
  useEffect(() => {
    setToken(paramTokenSearch);
  }, []);

  const navigate = useNavigate();
  const handleSignupSuccess = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: IFormInput) => {
    BaseApi.post("auth/reset-pass/" + `${token}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("تغییر رمز با موفقیت انجام شد");
          setTimeout(() => {
            handleSignupSuccess();
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("خطا در تغییر رمز :" + err);
        console.log(err);
      });
  };

  const [formInput, setFormInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    confirmPassword: "",
  });
  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validatePassInputs = (e: any) => {
    e.preventDefault();
    let formError = {
      confirmPassword: "",
    };
    if (formInput.confirmPassword !== formInput.newPassword) {
      setFormError({
        ...formError,
        confirmPassword: "تکرار رمزعبور با رمزعبور یکسان نیست",
      });
      return;
    }
    setFormError(formError);
    setFormInput((prev) => ({
      ...prev,
    }));
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="text-xl mb-12 justify-evenly flex">
                تنظیم رمز عبور جدید
              </div>
              <div className="text-sm text-right mb-8">
                لطفاً رمز جدیدی برای حساب خود انتخاب کنید
              </div>
              <div className="text-xs mt-6">
                <div className="mb-6">
                  <input
                    type="password"
                    dir="ltr"
                    placeholder="رمز عبور"
                    {...register("newPassword")}
                    value={formInput.newPassword}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.newPassword?.message && (
                    <p className="text-red-700">{errors.newPassword.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    dir="ltr"
                    placeholder="تکرار رمز عبور"
                    {...register("confirmPassword")}
                    value={formInput.confirmPassword}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    onKeyUp={validatePassInputs}
                    className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <button
                    className="text-center  text-white flex border-solid rounded-2xl bg-[#EA5A69] w-[136px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
                    type={"submit"}
                  >
                    ثبت رمز عبور جدید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
