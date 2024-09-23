export const ErrorPage = () => {
  return (
    <>
      <section>
        <div className="w-screen h-screen bg-center flex justify-center items-center">
          <img
            className="w-screen absolute inset-x-0 top-0"
            src="./img/Vector.svg"
            alt=""
          />
          <div className="flex-row justify-center text-black w-auto items-center py-16 px-10 h-auto rounded-3xl mt-3 border">
            <h1 className="text-4xl w-[404px] h-20 text-center">
              وای اینجا چه خبره؟!
            </h1>
            <div className="grid grid-rows-2  text-center justify-center">
              <div className="text-xl items-center h-[71px] w-auto">
                ظاهرا یک مشکلی وجود داره!{" "}
              </div>
              <div className="text-sm h-[71px] w-[320px]">
                ما داریم تلاش می‌کنیم که برطرفش کنیم.لطفا چند دقیقه دیگه دوباره
                تلاش کن
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="text-center border-solid rounded-2xl bg-[#EA5A69]  text-sm py-[8px] px-[16px] "
                type={"submit"}
              >
                بازگشت به صفحه قبلی
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
