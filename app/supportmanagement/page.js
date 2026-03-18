"use client";

import protectPage from "../utils/protectPage";
import SupportManagement from "@/component/support/SupportMnagement";

function Page() {
  return <div><SupportManagement/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("supportmanagement")(Page);
