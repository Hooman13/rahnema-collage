import { FunctionComponent, PropsWithChildren, useState } from "react";
import { PostModal } from "./PostModal";
interface IPostProps {
  id: string;
  imgUrl: string;
}
export const PostItem: FunctionComponent<PropsWithChildren<IPostProps>> = ({
  children,
  id,
  imgUrl,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <figure
        onClick={() => setOpenModal(true)}
        id={id}
        className="relative max-w-sm cursor-pointer hover:shadow-lg"
      >
        <img
          className="rounded-3xl w-full aspect-square object-cover transition-transform duration-300 transform hover:scale-105 peer"
          src={imgUrl}
          alt=""
        />
      </figure>
      {openModal && (
        <PostModal
          postId={id}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};
