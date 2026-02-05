"use client";
import BlogManagement from "@/component/blogmanagement/BlogManagement";
import protectPage from "../utils/protectPage";
import HeritageVaultManagement from "@/component/vaultmanagement/HeritageVaultManagement";

function Page() {
  return <div><HeritageVaultManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("vaultmanagement")(Page);
