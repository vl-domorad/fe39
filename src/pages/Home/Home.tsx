import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { getAllPosts, PostSelectors } from "../../redux/reducers/postSlice";
import { TabsNames } from "src/utils/@globalTypes";

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.All);

  const onTabClick = (key: TabsNames) => () => setActiveTab(key);
  const dispatch = useDispatch();

  const postsList = useSelector(PostSelectors.getAllPosts);
  const favouriteList = useSelector(PostSelectors.getLikedPosts);

  const getCurrentList = () => {
    switch (activeTab) {
      case TabsNames.Popular:
        return favouriteList;
      case TabsNames.MyPosts:
        //TODO дописать сюда мои посты из ДЗ на 30/03/2023
        return [];
      case TabsNames.Favourites:
        //TODO дописать сюда посты из тех, которые сохранены в избранное
        return [];
      case TabsNames.All:
      default:
        return postsList;
    }
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <Title title={"Blog"} />
      <Tabs activeTab={activeTab} onTabClick={onTabClick} />
      <CardsList cardsList={getCurrentList()} />
    </div>
  );
};

export default Home;
