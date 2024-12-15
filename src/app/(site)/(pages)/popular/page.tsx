import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { getProductsByFilter } from "@/sanity/sanity-shop-utils";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Page | NextMerce | Next.js E-commerce Boilerplate",
  description: "This is Shop Page for NextMerce Template",
  // other metadata
};

type Params = {
  searchParams: {
    date: string;
    sort: string;
  };
};

const ShopWithoutSidebarPage = async ({ searchParams }: Params) => {
  const dateOrder = searchParams?.date
    ? `| order(_createdAt ${searchParams?.date})`
    : "";

  const sortOrder = searchParams?.sort
    ? `| order(count(reviews) desc)`
    : "";
  const query = `*[_type == "product"] | order(count(reviews) desc) ${dateOrder}${sortOrder}`;
  const data = await getProductsByFilter(query, ["product"]);

  return (
    <main>
      <Breadcrumb
        title={"Our Best Products"}
        pages={["shop", "/", "popular"]}
      />
      <ShopWithoutSidebar shopData={data} path="popular" />
    </main>
  );
};

export default ShopWithoutSidebarPage;
