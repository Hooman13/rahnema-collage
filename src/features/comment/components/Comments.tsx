import { createContext, useState } from "react";
import { CommentsForm } from "./CommentsForm";
import { CommentsList } from "./CommentsList";

interface IProps {
  postId: string;
}
interface IParentComment {
  parentCommentId: string | null;
  setParentCommentId: React.Dispatch<React.SetStateAction<string | null>>;
}
export const CommentContext = createContext<IParentComment>({
  parentCommentId: null,
  setParentCommentId: () => {},
});
export const Comments: React.FC<IProps> = ({ postId }) => {
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  return (
    <>
      <CommentContext.Provider value={{ parentCommentId, setParentCommentId }}>
        <CommentsForm postId={postId} parentId={parentCommentId} />
        <CommentsList postId={postId} />
      </CommentContext.Provider>
    </>
  );
};
