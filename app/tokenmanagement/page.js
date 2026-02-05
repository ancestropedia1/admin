"use client";
import BlogManagement from "@/component/blogmanagement/BlogManagement";
import protectPage from "../utils/protectPage";
import TokenManagement from "@/component/tokenmanagement/TokenManagement";

function Page() {
  return <div><TokenManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("tokenmanagement")(Page);
