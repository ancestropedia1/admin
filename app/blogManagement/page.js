"use client";
import  BlogManagement  from "@/component/blogmanagement/BlogManagement";
// import protectPage from "../utils/protectPage.js";

function page() {
  return <div><BlogManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
// export default protectPage("blogmanagement")(page);
export default page;
