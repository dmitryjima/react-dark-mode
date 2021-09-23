import React, { createContext, useState, useLayoutEffect, useEffect } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../util/storageHelpers";

// Define and export color mode context
// Can be in two color modes: 'light' and 'dark'
export const ColorModeContext = createContext();

const ColorModeContextProvider = (props) => {
  // Try to retrieve already saved settings from
  // localStorage; if does not exist, try to get
  // system theme first
  const [colorMode, setColorMode] = useState(
    loadFromLocalStorage("colorMode") ?? 
    (
      window && window.matchMedia("(prefers-color-scheme: dark)").matches 
      ? 
      "dark" 
      : 
      "light" 
    )
  );

  // Updating `html` root element - according to the task, if I got it right;
  // NB! I usually go with updating a wrapper component in most 
  // of the projects to avoid unnecessary mixes of declarative
  // and imperative code, but this should work just fine.
  useLayoutEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [colorMode]);


  // Just playing around, to be honest: added an event listener
  // to update the colorMode of the app depending on the system's
  // selected color scheme; working fine on Android Chrome web via 
  // Ngrok tunnel.
  const setColorModeBasedOnSystemScheme = (e) => {
    setColorMode(e.matches ? "dark" : "light");
  }

  useEffect(() => {
    window && window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setColorModeBasedOnSystemScheme);

    return () => {
      window && window.matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", setColorModeBasedOnSystemScheme);
    }
  }, []);

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        toggleColorMode: () => {
          let newMode = colorMode === "light" ? "dark" : "light";
          // Added saving selected color mode to localStorage
          saveToLocalStorage("colorMode", newMode);
          setColorMode(newMode);
        },
      }}
    >
      {props.children}
    </ColorModeContext.Provider>
  );
};

export default ColorModeContextProvider;
