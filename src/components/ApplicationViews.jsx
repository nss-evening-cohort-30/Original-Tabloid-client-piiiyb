import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import Home from "./Home";
import Explore from "./Explore";
import SubscribedPosts from "./SubscribedPosts";
import MyPosts from "./MyPosts";
import Categories from "./Categories";
import Tags from "./Tags";
import PostsByTag from "./PostsByTag";
import UserProfileEdit from "./userprofiles/UserProfileEdit";
import PostDetails from "./PostDetails";
import AuthorDetails from "./authors/AuthorDetails";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="explore"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Explore />
            </AuthorizedRoute>
          }
        />
        <Route
          path="subscribed-posts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <SubscribedPosts />
            </AuthorizedRoute>
          }
        />
        <Route
          path="my-posts"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyPosts />
            </AuthorizedRoute>
          }
        />
        <Route
          path="categories"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Categories />
            </AuthorizedRoute>
          }
        />
        <Route
          path="tags"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
              <Tags />
            </AuthorizedRoute>
          }
        />
        <Route
          path="posts-by-tag"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PostsByTag />
            </AuthorizedRoute>
          }
        />
        <Route
          path="posts/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PostDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="authors/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <AuthorDetails />
            </AuthorizedRoute>
          }
        />

        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id/edit"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileEdit />
              </AuthorizedRoute>
            } 
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
