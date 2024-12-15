import ShopWithSidebar from "@/components/ShopWithSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Page | NextMerce | Next.js E-commerce Boilerplate",
  description: "This is Shop Page for NextMerce Template",
  // other metadata
};

const ShopWithSidebarPage = async () => {
  return (
    <main>
      <ShopWithSidebar products={["product"]} />
    </main>
  );
};

export default ShopWithSidebarPage;