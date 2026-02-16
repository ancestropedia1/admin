"use client";
import protectPage from "../utils/protectPage";
import WallArt from "@/component/wallart/WallArt";

function page() {
  return <div><WallArt/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("wallart")(page);
