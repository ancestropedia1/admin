"use client";

import protectPage from "../utils/protectPage";
import UserManagement from "@/component/usermanagement/userdetails/UserManagement";

function Page() {
  return <div><UserManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("usermanagement")(Page);
