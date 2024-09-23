export const EmailSent = () => {
  return (
    <>
      <section>
        <form>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="text-xl text-center">
                لینک تغییر رمز عبور ارسال شد. برای تنظیم رمز جدید لطفاً
                ایمیل‌تون رو چک کنید.
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
