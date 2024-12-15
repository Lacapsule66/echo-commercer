import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByFilter,
  imageBuilder,
} from "@/sanity/sanity-shop-utils";
import Breadcrumb from "@/components/Common/Breadcrumb";

type Params = {
  params: {
    slug: string;
  };
  searchParams: {
    date: string;
    sort: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  const categoryData = await getCategoryBySlug(slug);
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

  if (categoryData) {
    return {
      title: `${
        categoryData?.title || "Category Page"
      } | NextMerce - Next.js E-commerce Template`,
      description: `${categoryData?.description?.slice(0, 136)}...`,
      author: "NextMerce",
      alternates: {
        canonical: `${siteURL}/categories/${categoryData?.slug?.current}`,
        languages: {
          "en-US": "/en-US",
          "de-DE": "/de-DE",
        },
      },

      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      openGraph: {
        title: `${categoryData?.title} | NextMerce`,
        description: categoryData.description,
        url: `${siteURL}/categories/${categoryData?.slug?.current}`,
        siteName: "NextMerce",
        images: [
          {
            url: imageBuilder(categoryData.image).url(),
            width: 1800,
            height: 1600,
            alt: categoryData?.title,
          },
        ],
        locale: "en_US",
        type: "article",
      },

      twitter: {
        card: "summary_large_image",
        title: `${categoryData?.title} | NextMerce`,
        description: `${categoryData?.description?.slice(0, 136)}...`,
        creator: "@NextMerce",
        site: "@NextMerce",
        images: [imageBuilder(categoryData.image).url()],
        url: `${siteURL}/categories/${categoryData?.slug?.current}`,
      },
    };
  } else {
    return {
      title: "Not Found",
      description: "No product category has been found",
    };
  }
}

const CategoryPage = async ({ params, searchParams }: Params) => {
  const { slug } = params;
  const { date, sort } = searchParams;

  const categoryFilter = slug ? `&& category->slug.current == "${slug}"` : "";

  const dateOrder = date ? `| order(_createdAt ${date})` : "";
  const sortOrder = sort ? `| order(count(reviews) desc)` : "";
  const order = `${dateOrder}${sortOrder}`;
  const query = `*[_type == "product" ${categoryFilter}] ${order} `;

  const categoryData = await getCategoryBySlug(slug);

  const data = await getProductsByFilter(query, ["product"]);

  return (
    <main>
      <Breadcrumb
        title={categoryData ? categoryData.title : "Category Page"}
        pages={["category", "/", categoryData?.title]}
      />
      <ShopWithoutSidebar shopData={data} />
    </main>
  );
};

export default CategoryPage;
