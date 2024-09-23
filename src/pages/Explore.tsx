import { ProfileSidebar } from "../components/ProfileSidebar";
import { Header } from "../components/Header";
import { ExploreList } from "../components/ExploreList";
import { PagesLayout } from "./PagesLayout";
export const Explore = () => {
  return (
    <PagesLayout>
      <p className="text-xl sticky z-50 top-[20px] font-semibold mb-3">
        اکسپلور
      </p>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <ExploreList />
      </div>
    </PagesLayout>
  );
};
