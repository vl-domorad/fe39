import React, { useState } from "react";
import classNames from "classnames";

import styles from "./Tabs.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";

enum TabsNames {
  All,
  Favourites,
  Popular,
}

const TABS_LIST = [
  {
    title: "All",
    disabled: false,
    key: TabsNames.All,
  },
  {
    title: "My favorites",
    disabled: true,
    key: TabsNames.Favourites,
  },
  {
    title: "Popular",
    disabled: false,
    key: TabsNames.Popular,
  },
];
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.All);

  const onTabClick = (key: TabsNames) => () => setActiveTab(key);

  const { theme } = useThemeContext();

  // onTabClick = (key: TabsNames) => {
  //   return () => {
  //     setActiveTab(key);
  //   }
  // };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: theme === Theme.Dark,
      })}
    >
      {TABS_LIST.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabled]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onTabClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
