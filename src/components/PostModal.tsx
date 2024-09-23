import { Modal } from "flowbite-react";
import { DisplayPost } from "./DisplayPost";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMaximize } from "@fortawesome/free-solid-svg-icons";
interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string;
}
export const PostModal: React.FC<IProps> = ({
  openModal,
  setOpenModal,
  postId,
}) => {
  const postUrl = `/post/${postId}`;
  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="3xl"
      >
        <Modal.Body>
          <Link to={postUrl}>
            <FontAwesomeIcon
              icon={faMaximize}
              className="text-[#EA5A69] text-2xl p-1"

            />
          </Link>
          <DisplayPost postId={postId} />
        </Modal.Body>
      </Modal>
    </>
  );
};
