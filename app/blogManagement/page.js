"use client";
import BlogManagement from "../../component/blogmanagement/BlogManagement.js.js";
import protectPage from "../utils/protectPage.js";

function Page() {
  return <div><BlogManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("blogmanagement")(Page);
