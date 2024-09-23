import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { MyPage } from "../components/MyPage";

export const Home = () => {
  return (
    <>
      <div className="bg-[#F5F5F5] h-screen w-screen">
        <div className="container mx-auto pt-16 px-16">
          <Header />
          <div className="grid overflow-y-hidden	 grid-cols-12">
            {/* sideBar */}
            <ProfileSidebar />
            <div className="mr-16 grid col-span-9 overflow-y-scroll	">
              <MyPage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
