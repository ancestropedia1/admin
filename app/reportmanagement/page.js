"use client";
import BlogManagement from "@/component/blogManagement/BlogManagement";
import protectPage from "../utils/protectPage";
import ReportManagement from "@/component/reportmanagement/ReportManagement";

function Page() {
  return <div><ReportManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("reportmanagement")(Page);
