import React from "react";
import Button from "./Button";

type Props = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: (type: any) => Promise<void>;
};

const AIPIcker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: Props) => {
  return (
    <div className="top-0 aipicker-container">
      <textarea
        name=""
        id=""
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="A sleek, shiny metallic texture in a silver or gold hue for a glamorous, high-end feel, etc..."
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <Button type="outline" title="asking ai..." sx="text-xs" />
        ) : (
          <>
            <Button
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              sx="text-xs"
            />
            <Button
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              sx="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPIcker;
