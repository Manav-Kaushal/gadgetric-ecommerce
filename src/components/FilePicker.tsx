import React from "react";
import Button from "./Button";

type Props = {
  file: any;
  setFile: React.Dispatch<any>;
  readFile: (type: any) => void;
};

const FilePicker = ({ file, setFile, readFile }: Props) => {
  return (
    <div className="top-0 filepicker-container">
      <div className="flex flex-col flex-1">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) =>
            e.target.files && e.target.files[0] && setFile(e.target.files[0])
          }
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-xs text-gray-500 truncate">
          {file === null ? "No file selected" : file?.name}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          sx="text-xs"
        />
        <Button
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          sx="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
