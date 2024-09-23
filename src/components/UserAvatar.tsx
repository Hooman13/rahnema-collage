import { Link } from "react-router-dom";

interface IProps {
  username: string;
  fullname?: string;
  imgUrl?: string;
  followersCount?: number;
}
export const UserAvatar: React.FC<IProps> = ({
  username,
  fullname,
  imgUrl,
  followersCount = 0,
}) => {
  return (
    <Link
      to={"/profile/" + username}
      rel="author"
      className="flex items-center text-sm text-zinc-900 dark:text-white"
    >
      <img
        className="flex-none w-12 h-12 rounded-full ml-4"
        src={
          imgUrl
            ? process.env.REACT_APP_IMAGE_URL + imgUrl
            : "../img/person.png"
        }
        alt={username}
      />
      <div className="flex-auto">
        <div className="font-bold">{fullname || username}</div>
        {followersCount > 0 ? (
          <div className="text-xs font-normal">
            {followersCount}
            <span className="mr-1">دنبال کننده</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
};
