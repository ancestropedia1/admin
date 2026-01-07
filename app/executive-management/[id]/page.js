"use client";

import MainInfo from "@/component/executivemanagement/executiveoverview/MainInfo";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id;

  return <MainInfo executiveId={id} />;
}
