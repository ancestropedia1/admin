"use client";

import protectPage from "../utils/protectPage";
import AddUserPage from "@/component/addUser/AddUser";

function Page() {
  return <div><AddUserPage/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("adduser")(Page);
