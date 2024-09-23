import { TaggedList } from "../components/TaggedList";
import { PagesLayout } from "./PagesLayout";

export const Tags = () => {
  return (
    <>
      <PagesLayout>
        <p className="text-xl font-semibold sticky z-50 top-[20px] mb-3">
          تگ شده ها
        </p>
        <div className="w-full bg-inherit flex flex-col justify-center">
          <TaggedList />
        </div>
      </PagesLayout>
    </>
  );
};
