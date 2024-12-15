import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import BlogItem from "../Blog/BlogItem";
import { sanityFetch } from "@/sanity/sanity-utils";
import { Blog } from "@/types/blogItem";
import { getPosts } from "@/sanity/sanity-blog-uitls";

const BlogGrid = async () => {
  const blogData: Blog[] = await getPosts();

  return (
    <>
      <Breadcrumb title={"Blog Grid"} pages={["blog grid"]} />{" "}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
            {blogData.map((blog: Blog, key: number) => (
              <BlogItem blog={blog} key={key} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
