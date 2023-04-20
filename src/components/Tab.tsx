import state from "@store/index";
import { classNames } from "@utils/helpers";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { useSnapshot } from "valtio";

type Props = {
  tab: {
    name: string;
    icon: StaticImageData;
  };
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  sx?: string;
};

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick, sx }: Props) => {
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
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4",
        sx
      )}
      onClick={handleClick}
      style={activeStyles}
    >
      <div className="relative aspect-[1] w-8">
        <Image
          src={tab.icon.src}
          alt={tab.name}
          className={classNames(
            isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
          )}
          fill
        />
      </div>
    </div>
  );
};

export default Tab;
