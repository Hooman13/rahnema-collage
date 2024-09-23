import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { NewPass } from "./NewPass";
import { PassRecovery } from "./PassRecovery";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { EmailSent } from "./EmailSent";
import RequireAuth from "../components/RequireAuth";
import { ErrorPage } from "./Error";
import { Saved } from "./Saved";
import { Messages } from "./Messages";
import { Search } from "./Search";
import { Explore } from "./Explore";
import { Tags } from "./Tags";
import { Notifs } from "./Notifs";
import { PostPage } from "./PostPage";
import { Home } from "./Home";
import { FriendsNotif } from "./FriendsNotif";
import { CloseFriendList } from "../components/CloseFriendList";
import { BlockList } from "../components/BlockList";
import SearchTag from "./SearchTag";

export const LoginBasePage = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<PassRecovery />} />
          <Route path="/reset-password" element={<NewPass />} />
          <Route path="/email-sent-page" element={<EmailSent />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Explore />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search-people" element={<Search />} />
            <Route path="/search-tags" element={<SearchTag />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/Notifs" element={<Notifs />} />
            <Route path="/friends-notifs" element={<FriendsNotif />} />
            <Route path="/close-friend" element={<CloseFriendList />} />
            <Route path="/block-list" element={<BlockList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
