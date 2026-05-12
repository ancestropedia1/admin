"use client";
import BlogManagement from "@/component/blogmanagement/BlogManagement";

function page() {
  return <div><BlogManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
// export default protectPage("blogmanagement")(page);
export default page;
