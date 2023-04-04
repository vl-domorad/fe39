import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import classNames from "classnames";

import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { getAllPosts, PostSelectors } from "src/redux/reducers/postSlice";
import { TabsNames } from "src/utils/@globalTypes";
import { PER_PAGE } from "src/utils/constants";
import styles from "./Home.module.scss";
import Loader from "src/components/Loader";

enum Order {
  Title = "title",
  Date = "date",
}

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.All);
  const [currentPage, setCurrentPage] = useState(1);

  const onTabClick = (key: TabsNames) => () => {
    setActiveTab(key);
    setCurrentPage(1);
  };
  const dispatch = useDispatch();

  const postsList = useSelector(PostSelectors.getAllPosts);
  const favouriteList = useSelector(PostSelectors.getLikedPosts);
  const postsCount = useSelector(PostSelectors.getAllPostsCount);
  const isLoading = useSelector(PostSelectors.getAllPostsLoading);

  const pagesCount = Math.ceil(postsCount / PER_PAGE);

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
    const offset = PER_PAGE * (currentPage - 1);
    dispatch(getAllPosts({ offset }));
  }, [currentPage]);
  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <div>
      <Title title={"Blog"} />
      <Tabs activeTab={activeTab} onTabClick={onTabClick} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CardsList cardsList={getCurrentList()} />
          {activeTab !== TabsNames.Popular &&
            activeTab !== TabsNames.Favourites && (
              <ReactPaginate
                pageCount={pagesCount}
                onPageChange={onPageChange}
                containerClassName={styles.pagesContainer}
                pageClassName={styles.pageNumber}
                breakClassName={styles.pageNumber}
                breakLinkClassName={styles.linkPage}
                activeLinkClassName={styles.linkPage}
                pageLinkClassName={styles.linkPage}
                activeClassName={styles.activePageNumber}
                nextClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === pagesCount,
                })}
                previousClassName={classNames(styles.arrowButton, {
                  [styles.blockedButton]: currentPage === 1,
                })}
                previousLinkClassName={styles.linkPage}
                nextLinkClassName={styles.linkPage}
              />
            )}
        </>
      )}
    </div>
  );
};

export default Home;
