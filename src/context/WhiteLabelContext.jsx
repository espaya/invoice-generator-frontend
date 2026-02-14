import { createContext, useContext, useEffect, useState } from "react";

const WhiteLabelContext = createContext();

export function WhiteLabelProvider({ children }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const [customCss, setCustomCss] = useState("");
  const [loadingWhiteLabel, setLoadingWhiteLabel] = useState(true);

  // ==========================
  // FETCH WHITE LABEL SETTINGS
  // ==========================
  useEffect(() => {
    const fetchWhiteLabelCss = async () => {
      try {
        const res = await fetch(`${apiBase}/api/company-settings`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCustomCss(data?.custom_css || "");
        }
      } catch (err) {
        console.error("Fetch White Label CSS error:", err);
      } finally {
        setLoadingWhiteLabel(false);
      }
    };

    fetchWhiteLabelCss();
  }, [apiBase]);

  // ==========================
  // APPLY CUSTOM CSS GLOBALLY
  // ==========================
  useEffect(() => {
    if (loadingWhiteLabel) return;

    let styleTag = document.getElementById("custom-white-label-css");

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "custom-white-label-css";
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = customCss || "";
  }, [customCss, loadingWhiteLabel]);

  return (
    <WhiteLabelContext.Provider
      value={{
        customCss,
        setCustomCss,
        loadingWhiteLabel,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  );
}

export function useWhiteLabel() {
  return useContext(WhiteLabelContext);
}
