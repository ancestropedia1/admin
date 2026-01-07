"use client";
import BlogManagement from "@/component/blogManagement/BlogManagement";
import protectPage from "../utils/protectPage";

function Page() {
  return <div><BlogManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("blogmanagement")(Page);
