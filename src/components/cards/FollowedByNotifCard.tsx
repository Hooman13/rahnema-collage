import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { Follow } from "../buttons/Follow";
import { DeleteFollowReq } from "../buttons/DeleteFollowReq";
import { TimeAgoDate } from "../../utils/TimeAgoDate";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
}
interface IFollowedBy {
  user: IUsers;
  createdAt: string;
  isSeen: boolean;
  followState: string;
}

export const FollowedByNotifCard: FunctionComponent<
  PropsWithChildren<IFollowedBy>
> = ({ children, user, createdAt, isSeen, followState }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      {isSeen === false ? (
        <div className="bg-[#E9E4FF] rounded-lg flex justify-between items-center  text-xl text-center mb-8">
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
                <div>
                  {user.fName && user.lName
                    ? `${user.fName} ${user.lName}  دنبالت کرد `
                    : `${user.username} دنبالت کرد`}
                </div>
              </div>
              <div className="text-xs h-6 font-normal ">
                <p>{createdAt && TimeAgoDate(createdAt)}</p>
              </div>
            </div>
            <div className="mr-20">
              {followState === "notFollowed" ? (
                <button>
                  <Follow user={user.username} />
                </button>
              ) : followState === "requestedFollow" ? (
                <button>
                  <DeleteFollowReq user={user.username} />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center  text-xl text-center mb-8">
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
                <div>
                  {user.fName && user.lName
                    ? `${user.fName} ${user.lName}  دنبالت کرد `
                    : `${user.username} دنبالت کرد`}
                </div>
              </div>
              <div className="text-xs h-6 font-normal ">
                <p>{createdAt && TimeAgoDate(createdAt)}</p>
              </div>
            </div>
            <div className="mr-20">
              {followState === "notFollowed" ? (
                <button>
                  <Follow user={user.username} />
                </button>
              ) : followState === "requestedFollow" ? (
                <button>
                  <DeleteFollowReq user={user.username} />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
