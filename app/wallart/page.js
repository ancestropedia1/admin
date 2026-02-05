"use client";
import BlogManagement from "@/component/blogmanagement/BlogManagement";
import protectPage from "../utils/protectPage";
import WallArt from "@/component/wallart/WallArt";

function BlogsPage() {
  return <div><WallArt/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("wallart")(BlogsPage);
