"use client";
import BlogManagement from "../../component/blogmanagement/BlogManagement.js";
import protectPage from "../utils/protectPage";
import SupportManagement from "@/component/supportmanagement.js/SupportMnagement";

function Page() {
  return <div><SupportManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("supportmanagement")(Page);
