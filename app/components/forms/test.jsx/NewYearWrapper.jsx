"use client";
import dynamic from "next/dynamic";

const NewYearBlastPopup = dynamic(
  () => import("@/app/components/forms/test.jsx/NewYearBlastPopup"),
  { ssr: false }
);

export default function NewYearWrapper() {
  return <NewYearBlastPopup />;
}
