import { ProfileSidebar } from "../components/ProfileSidebar";
import { Header } from "../components/Header";
import { ExploreList } from "../components/ExploreList";

export const PagesLayout = ({ children }: { children: any }) => {
  return (
    <>
      {/* header */}
      <Header />
      {/* main */}
      <section className="max-w-7xl w-full mx-auto px-4 md:px-6">
        <div className="grid grid-cols-12 items-start sm:gap-9 lg:gap-[72px]">
          {/* sideBar */}
          <div className="col-span-3 pt-2 h-full relative hidden md:flex">
            <ProfileSidebar />
          </div>
          <div className="pt-2 col-span-12 md:col-span-9 relative">
            {children}
          </div>
        </div>
      </section>
    </>
  );
};
