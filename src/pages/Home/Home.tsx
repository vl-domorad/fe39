import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { getAllPosts, PostSelectors } from "../../redux/reducers/postSlice";

const Home = () => {
  const dispatch = useDispatch();

  //TODO remove on next lesson
  const params = useParams();
  console.log("Id from url", params?.id);

  const postsList = useSelector(PostSelectors.getAllPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <Title title={"Blog"} />
      <Tabs />
      <CardsList cardsList={postsList} />
    </div>
  );
};

export default Home;
