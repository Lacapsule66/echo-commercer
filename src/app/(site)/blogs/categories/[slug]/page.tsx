import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BlogItem from "@/components/Blog/BlogItem";
import {
  getPostsByCategoryOrTag,
  getCategoryBySlug,
  getPostCategories,
} from "@/sanity/sanity-blog-uitls";
import { Blog } from "@/types/blogItem";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const categories = await getPostCategories();
  return categories.map((category) => ({
    slug: category?.slug?.current,
  }));
}


const BlogGrid = async ({ params }: Props) => {
  const { slug } = params;
  const query = `postCategory->slug.current == "${slug}"`;

  const blogData: Blog[] = await getPostsByCategoryOrTag(slug);
  const category = await getCategoryBySlug(slug);

  return (
    <>
      <Breadcrumb
        title={`${category ? category?.title : "Blog Category"}`}
        pages={["category"]}
      />{" "}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
            {blogData.length > 0 ? (
              blogData.map((blog, key) => <BlogItem blog={blog} key={key} />)
            ) : (
              <p>No posts found!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
