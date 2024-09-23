import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { TimeAgoDate } from "../../utils/TimeAgoDate";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
}
interface IacceptedFollow {
  user: IUsers;
  createdAt: string;
  isSeen: boolean;
}

export const AcceptedFollowNotifCard: FunctionComponent<
  PropsWithChildren<IacceptedFollow>
> = ({ children, user, createdAt, isSeen }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      {isSeen === false ? (
        <div className="bg-[#E9E4FF] rounded-lg flex justify-between items-center text-xl text-center mb-8">
          <div className="items-center flex justify-start">
            <div>
              <button onClick={() => visitProfile()}>
                <img
                  className="border rounded-full ml-7 w-[56px] h-[56px]"
                  src={
                    user.imageUrl
                      ? process.env.REACT_APP_IMAGE_URL + user.imageUrl
                      : "../img/person.png"
                  }
                  alt=""
                />
              </button>
            </div>
            <div className="grid grid-rows-2 text-right">
              <div className="row-span-1 flex text-sm h-6 font-medium">
                {user.fName && user.lName
                  ? `${user.fName} ${user.lName}  درخواست دوستی‌ات رو قبول کرد`
                  : `${user.username}  درخواست دوستی‌ات رو قبول کرد`}
              </div>
              <div className="text-xs h-6 font-normal ">
                <p>{createdAt && TimeAgoDate(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center text-xl text-center mb-8">
          <div className="items-center flex justify-start">
            <div>
              <button onClick={() => visitProfile()}>
                <img
                  className="border rounded-full ml-7 w-[56px] h-[56px]"
                  src={
                    user.imageUrl
                      ? process.env.REACT_APP_IMAGE_URL + user.imageUrl
                      : "../img/person.png"
                  }
                  alt=""
                />
              </button>
            </div>
            <div className="grid grid-rows-2 text-right">
              <div className="row-span-1 flex text-sm h-6 font-medium">
                {user.fName && user.lName
                  ? `${user.fName} ${user.lName}  درخواست دوستی‌ات رو قبول کرد`
                  : `${user.username}  درخواست دوستی‌ات رو قبول کرد`}
              </div>
              <div className="text-xs h-6 font-normal ">
                <p>{createdAt && TimeAgoDate(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
