import state from "@store/index";
import { classNames } from "@utils/helpers";
import { StaticImageData } from "next/image";
import React from "react";
import { useSnapshot } from "valtio";

type Props = {
  tab: {
    name: string;
    icon: StaticImageData;
  };
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: string;
};

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }: Props) => {
  const snap = useSnapshot(state);

  const activeStyles =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : {
          backgroundColor: "transparent",
          opacity: 1,
        };

  return (
    <div
      key={tab.name}
      className={classNames(
        "tab-btn",
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      )}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon.src}
        alt={tab.name}
        className={classNames(
          isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        )}
      />
    </div>
  );
};

export default Tab;
