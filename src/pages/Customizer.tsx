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
import { downloadCanvasToImage, reader } from "@utils/helpers";
import { download } from "@public/assets";
import { ActiveFilterNames, ActiveTabNames } from "@utils/enums";

type Props = {};

const Customizer = (props: Props) => {
  const snap: any = useSnapshot(state);

  const [file, setFile] = useState<any>("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<any>({
    logoShirt: true,
    stylishShirt: false,
  });

  // Show tab content depending on active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case ActiveTabNames.ColorPicker:
        return <ColorPicker />;
      case ActiveTabNames.FilePicker:
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case ActiveTabNames.AiPicker:
        return (
          <AIPIcker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleDecals = (type: "logo" | "full", result: any) => {
    const decalType: any = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleSubmit = async (type: "logo" | "full") => {
    if (!prompt) return alert("Please enter a prompt!");

    try {
      setGeneratingImg(true);
      const response = await fetch("/api/v1/dalle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleActiveFilterTab = (tabName: ActiveFilterNames) => {
    switch (tabName) {
      case ActiveFilterNames.LogoShirt:
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case ActiveFilterNames.StylishShirt:
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // After setting state, we need activeFilterTab to update the UI
    setActiveFilterTab((prevState: any) => {
      return { ...prevState, [tabName]: !prevState[tabName] };
    });
  };

  const readFile = (type: any) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const handleActiveEditorTab = (name: string) => {
    if (activeEditorTab === name) {
      setActiveEditorTab("");
    } else {
      setActiveEditorTab(name);
    }
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
                    handleClick={() => handleActiveEditorTab(tab.name)}
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
                handleClick={() =>
                  handleActiveFilterTab(tab.name as ActiveFilterNames)
                }
                isActiveTab={activeFilterTab[tab.name as ActiveFilterNames]}
                isFilterTab
              />
            ))}
            <Tab
              tab={{
                name: "download",
                icon: download,
              }}
              handleClick={() => downloadCanvasToImage()}
              isFilterTab
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
