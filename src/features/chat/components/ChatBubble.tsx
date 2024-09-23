import { IMessage } from "../../../data/types";
import moment from "jalali-moment";
interface IProps extends IMessage {
  username: string;
  fullname?: string;
  imgUrl?: string;
}
export const ChatBubble: React.FC<IProps> = ({
  messageId,
  content,
  image,
  isOwned,
  createdAt,
  username,
  imgUrl,
  fullname,
}) => {

  return (
    <>
      <div className="flex items-start gap-2">
        <div
          className={
            isOwned
              ? "ml-auto flex min-w-32 max-w-[50%] flex-col gap-2 rounded-3xl rounded-tr-none bg-orange-500 mb-3 w-fit"
              : "mr-auto flex min-w-32 max-w-[50%] flex-col gap-2 rounded-3xl rounded-tl-none bg-slate-400 mb-3 w-fit"
          }
        >
          <div className={content && "p-2"}>
            {image ? (
              <img
              className={
                isOwned
                  ? "h-auto max-w-full rounded-tl-3xl"
                  : "h-auto max-w-full rounded-tr-3xl"
              }
                src={process.env.REACT_APP_IMAGE_URL + image}
                alt=""
              />
            ) : (
              <div className="text-right m-2 mb-2 font-normal text-sm text-white">
                {content}
              </div>
            )}
            <div className="text-left px-2">
              <span className="text-xs font-light text-white">
                {createdAt && moment(createdAt).format("HH:mm")}
              </span>
            </div>
          </div>
        </div>
        {!isOwned && (
          <img
            className="w-8 h-8 rounded-full flex-none"
            src={
              imgUrl
                ? process.env.REACT_APP_IMAGE_URL + imgUrl
                : "../img/person.png"
            }
            alt=""
          />
        )}
      </div>
    </>
  );
};
