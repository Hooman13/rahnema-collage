import { DisplayPost } from "../components/DisplayPost";
import { useParams } from "react-router-dom";
import { PagesLayout } from "./PagesLayout";

export const PostPage = () => {
  const { postId } = useParams();
  return (
    <PagesLayout>
      <div className="ml-8 grid pt-2 col-span-10 overflow-y-scroll">
        {postId && <DisplayPost postId={postId} />}
      </div>
    </PagesLayout>
  );
};
