import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextMerce | Next.js E-commerce Boilerplate",
  description: "This is Home for NextMerce Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
