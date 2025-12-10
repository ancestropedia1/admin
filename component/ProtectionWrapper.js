"use client";
import { useEffect } from "react";

export default function ProtectionWrapper({ children }) {
  useEffect(() => {
    const disable = (e) => e.preventDefault();

    document.addEventListener("contextmenu", disable);
    document.addEventListener("copy", disable);
    document.addEventListener("cut", disable);
    document.addEventListener("paste", disable);
    document.addEventListener("selectstart", disable);
    document.addEventListener("dragstart", disable);

    return () => {
      document.removeEventListener("contextmenu", disable);
      document.removeEventListener("copy", disable);
      document.removeEventListener("cut", disable);
      document.removeEventListener("paste", disable);
      document.removeEventListener("selectstart", disable);
      document.removeEventListener("dragstart", disable);
    };
  }, []);

  return <>{children}</>;
}
