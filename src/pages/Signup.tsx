import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../api/signup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

import { BaseApi } from "../api/axios";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید شامل حداقل ۳ حرف باشد")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      " نام کاربری باید فقط شامل حروف و عدد و آندرلاین باشد"
    ),
  email: z.string().email("ایمیل وارد شده نامعتبر است"),
  password: z.string().min(8, "رمزعبور باید حداقل شامل ۸ حرف باشد"),
  confirmPassword: z.string().min(8),
});

type IFormInput = z.infer<typeof FormSchema>;

export const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();
  const handleSignupSuccess = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const onSubmit = (data: IFormInput) => {
    setIsLoading(true);

    BaseApi.post("auth/signup", JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response?.status === 201) {
          toast.success("ثبت نام شما با موفقیت انجام شد");
          handleSignupSuccess();
        }
      })
      .catch((err) => {
        switch (err?.response?.data?.reason) {
          case "DupUser":
            toast.error("این کاربر قبلا عضو کالج گرام شده است");
            break;
          case "InvalidUsername":
          case "InvalidEmail":
            toast.error("فرمت نام کاربری یا ایمیل اشتباه است");
            break;
          case "InvalidPassword":
          case "InvalidConfirmPassword":
            toast.error("فرمت رمز عبور اشتباه است");
            break;
          case "NotSamePasswords":
            toast.error("تکرار رمز عبور اشتباه است");
            break;

          default:
            toast.error("سرور در دسترس نیست");
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [formInput, setFormInput] = useState({
    password: "",
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
    if (formInput.confirmPassword !== formInput.password) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-[#F5F5F5] w-screen md:w-[485px] h-screen md:h-auto  py-8 shadow-lg rounded-3xl px-20 ">
              <div className="flex justify-center pb-5">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="text-xl mb-6 justify-evenly flex">
                <Link to="/login">
                  <button className="text-[#A5A5A5]">ورود</button>
                </Link>
                |
                <Link to="/signup">
                  <button>ثبت نام</button>
                </Link>
              </div>
              <div className="text-right text-sm mb-4 font-normal">
                برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید
              </div>
              <div className="font-normal text-xs">
                <div className="mb-4">
                  <input
                    type="text"
                    dir="ltr"
                    {...register("username")}
                    placeholder="نام کاربری"
                    className="border rounded-2xl w-full text-right px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.username?.message && (
                    <p className="text-red-700">{errors.username.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    dir="ltr"
                    {...register("email", { required: true })}
                    placeholder="ایمیل"
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    dir="ltr"
                    {...register("password")}
                    value={formInput.password}
                    placeholder="رمز عبور"
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.password?.message && (
                    <p className="text-red-700">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    dir="ltr"
                    {...register("confirmPassword")}
                    value={formInput.confirmPassword}
                    placeholder="تکرار رمز عبور"
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    onKeyUp={validatePassInputs}
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
              </div>
              <div>
                <button
                  className="font-normal text-sm text-center mt-6 flex border-solid rounded-2xl bg-[#EA5A69]  text-white w-[84px] mr-auto justify-center items-center px-[16px] py-[8px] "
                  type="submit"
                >
                  {!isLoading && <span>ثبت نام</span>}
                  {isLoading && (
                    <Spinner aria-label="signup..." size="sm"></Spinner>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};
