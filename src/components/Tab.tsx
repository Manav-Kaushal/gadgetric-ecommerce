import { StaticImageData } from "next/image";
import React from "react";

type Props = {
  tab: {
    name: string;
    icon: StaticImageData;
  };
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: string;
};

const Tab = (props: Props) => {
  return <div>Tab</div>;
};

export default Tab;
