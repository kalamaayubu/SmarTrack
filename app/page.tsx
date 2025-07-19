'use client'

import SlideTransition from "@/components/SlideTransition";
import Home from "@/components/views/Home";
import Scanning from "@/components/views/Scanning";
import Settings from "@/components/views/Settings";
import { AnimatePresence } from "framer-motion";
import { useState } from "react"

type View = "home" | "scanning" | "settings";

const HomePage = () => {
  const [view, setView] = useState<View>("home");
  const [prevView, setPrevView] = useState<View>("home");
  
  const handleSetView = (newView: View) => {
    setPrevView(view);
    setView(newView);
  };
  
  const views: Record<View, JSX.Element> = {
    home: <Home setView={handleSetView}/>,
    settings: <Settings setView={handleSetView}/>,
    scanning: <Scanning setView={handleSetView}/>
  }

  // Set the view
  const direction: "left" | "right" = view === "home" && prevView === "settings"
  ? "right"
  : "left";


  return (
    <div className="relative overflow-hidden min-h-lvh p-4">
      <AnimatePresence mode="wait" initial={false}>
        <SlideTransition key={view} direction={direction}>
          {views[view]}
        </SlideTransition>
      </AnimatePresence>
      
      {/* Perform location check and set the status */}
    </div>
  )
}

export default HomePage