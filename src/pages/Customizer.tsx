import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "@store/index";
import { fadeAnimation, slideAnimation } from "@utils/motion";
import { EditorTabs, FilterTabs } from "@utils/constants";
import Tab from "@components/Tab";
import Button from "@components/Button";

type Props = {};

const Customizer = (props: Props) => {
  const snap = useSnapshot(state);

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
              <div className="editor-tabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => {}} />
                ))}
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
                handleClick={() => {}}
                isFilterTab
                isActiveTab=""
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
