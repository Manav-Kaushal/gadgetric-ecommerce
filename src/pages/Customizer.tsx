import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "@store/index";
import { fadeAnimation, slideAnimation } from "@utils/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "@utils/constants";
import Tab from "@components/Tab";
import Button from "@components/Button";
import ColorPicker from "@components/ColorPicker";
import FilePicker from "@components/FilePicker";
import AIPIcker from "@components/AIPIcker";
import { reader } from "@utils/helpers";

type Props = {};

const Customizer = (props: Props) => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // Show tab content depending on active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AIPIcker />;
      default:
        return null;
    }
  };

  const handleDecals = (type: "logo" | "full", result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: "logoShirt" | "stylishShirt") => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    // After setting state, we need activeFilterTab to update the ui
    setActiveFilterTab((prevState) => {
      return { ...prevState, [tabName]: !prevState[tabName] };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Left Panel */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="relative editor-tabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Button
              type="filled"
              title="go back"
              handleClick={() => (state.intro = true)}
              sx="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* Bottom Button Bar */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab
                isActiveTab={activeEditorTab[tab.name]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
