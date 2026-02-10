"use client";
import BlogManagement from "../../component/blogmanagement/BlogManagement.js";
import protectPage from "../utils/protectPage";
import DnaKit from "@/component/dna-kit/DnaKit";

function Page() {
  return <div><DnaKit/></div>;
}

// 🚨 ONLY users with "blogmanagement" permission can open this page
export default protectPage("dna-kit")(Page);
