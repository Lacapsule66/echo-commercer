import BlogDetails from "@/components/BlogDetails";
import React from "react";
import { Metadata } from "next";
import { getPost } from "@/sanity/sanity-blog-uitls";
export const metadata: Metadata = {
  title: "Blog Details Page | NextMerce | Next.js E-commerce Boilerplate",
  description: "This is Blog Details Page for NextMerce Template",
  // other metadata
};

const BlogDetailsPage = async () => {
  const slug = "cooking-masterclass-creating-delicious-italian-pasta";

  const blogData = await getPost(slug);

  return (
    <main>
      <BlogDetails blogData={blogData} />
    </main>
  );
};

export default BlogDetailsPage;
