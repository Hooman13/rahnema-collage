import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { FollowingMenu } from "../FollowingMenu";
interface IUsers {
  username: string;
  followersCount: number;
  imageUrl: string;
}

export const FollowingCard: FunctionComponent<PropsWithChildren<IUsers>> = ({
  children,
  username,
  followersCount,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <div className="w-full h-14 justify-between items-center text-xl text-center mb-8 flex">
        <button onClick={() => visitProfile()}>
          <img
            className="border rounded-full ml-7 w-[56px] h-[56px]"
            src={process.env.REACT_APP_IMAGE_URL + imageUrl}
            alt=""
          />
        </button>
        <div className="flex flex-col text-right mr-0">
          <div className="user-display-name text-sm h-6 font-bold">
            {username}
          </div>
          <div className="user-full-name text-xs h-6 font-normal text-black">
            <p>{followersCount} دنبال کننده</p>
          </div>
        </div>
        <div className="mr-auto">
          <FollowingMenu user={username} />
        </div>
      </div>
    </>
  );
};
