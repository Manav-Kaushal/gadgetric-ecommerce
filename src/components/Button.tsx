import state from "@store/index";
import { classNames, getContrastingColor } from "@utils/helpers";
import React from "react";
import { useSnapshot } from "valtio";

type Props = {
  type: "filled" | "outline";
  title: string;
  sx?: string;
  handleClick?: () => void;
};

const Button = ({ type, title, sx, handleClick }: Props) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: "filled" | "outline") => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={classNames("px-2 py-1.5 flex-1 rounded-md capitalize", sx)}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
