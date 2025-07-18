'use client'

import SlideTransition from "@/components/SlideTransition";
import Home from "@/components/views/Home";
import Settings from "@/components/views/Settings";
import { AnimatePresence } from "framer-motion";
import { useState } from "react"

const HomePage = () => {
  const [view, setView] = useState("home");
  const [prevView, setPrevView] = useState("home");
  const [isInSwahilipot, setIsInSwahilipot] = useState(true);

  const handleSetView = (newView: string) => {
    setPrevView(view);
    setView(newView);
  };


  // Set the view
  const direction = view === "settings" ? "left" : "right"

  return (
    <div className="relative overflow-hidden h-[100dvh] p-4">
      <AnimatePresence mode="wait" initial={false}>
        {view == "home" && (
            <SlideTransition key={"home"} direction={direction}>
              <Home 
                location={isInSwahilipot ? "You're in Swahilipot" : "You are not in Swahilipot"}
                setView={handleSetView}
              />
            </SlideTransition>
          )
        }

        {view == "settings" && (
          <SlideTransition key={"settings"} direction={direction}>
            <Settings 
              setView={handleSetView}
            />
          </SlideTransition>
        )}
      </AnimatePresence>
      
      {/* Perform location check and set the status */}
    </div>
  )
}

export default HomePage