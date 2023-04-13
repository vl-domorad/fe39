import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PagesContainer from "./PagesContainer";
import SignIn from "./SignIn";
import Home from "./Home";
import SignUp from "./SignUp";
import Confirm from "./Cofirm";
import { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import Search from "src/pages/Search";
import AddPost from "src/pages/AddPost";
import ResetPassword from "src/pages/ResetPassword";
import NewPassword from "src/pages/NewPassword";

export enum RoutesList {
  Home = "/",
  SinglePost = "/blog/:id",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Confirm = "/activate/:uid/:token",
  Success = "/sign-up/success",
  Default = "*",
  ResetPassword = "/sign-in/reset-password",
  NewPassword = "/password/reset/confirm/:uid/:token",
}

const Router = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route path={RoutesList.SinglePost} element={<Home />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.Confirm} element={<Confirm />} />
          <Route path={RoutesList.Search} element={<Search />} />
          <Route path={RoutesList.Default} element={<div>404 NOT FOUND</div>} />
          <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
