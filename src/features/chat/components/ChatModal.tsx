import { Modal } from "flowbite-react";
import { Chat } from "./Chat";
import { ChatForm } from "./ChatForm";
import { UserAvatar } from "../../../components/UserAvatar";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  reciverUsername: string;
  imgUrl?: string;
  fullname?: string;
}
export const ChatModal: React.FC<IProps> = ({
  openModal,
  setOpenModal,
  reciverUsername,
  imgUrl,
  fullname,
}) => {
  return (
    <>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="4xl"
      >
        <Modal.Header className="grid grid-cols-4">
          <div className="flex ml-auto">
            <UserAvatar
              username={reciverUsername}
              imgUrl={imgUrl}
              fullname={fullname}
              // followersCount={2}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Chat
            username={reciverUsername}
            imgUrl={imgUrl}
            fullname={fullname}
          />
        </Modal.Body>
        <Modal.Footer>
          <ChatForm ReciverUsername={reciverUsername} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
