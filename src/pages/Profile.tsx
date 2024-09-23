import { Header } from "../components/Header";
import { MyPage } from "../components/MyPage";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { PagesLayout } from "./PagesLayout";

export const Profile = () => {
  return (
    <PagesLayout>
      <p className="text-xl font-semibold mb-3">صفحه من</p>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <MyPage />
      </div>
    </PagesLayout>
  );
};
