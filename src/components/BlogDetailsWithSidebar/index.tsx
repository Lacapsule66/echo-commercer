import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SearchForm from "../Blog/SearchForm";
import LatestPosts from "../Blog/LatestPosts";
import LatestProducts from "../Blog/LatestProducts";
import Image from "next/image";
import { imageBuilder } from "@/sanity/sanity-shop-utils";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Categories from "../Blog/Categories";
import Tags from "../Blog/Tags";
import SocialShare from "../Blog/SocialShare";
import { Blog } from "@/types/blogItem";

const BlogDetailsWithSidebar = ({ blogData }: { blogData: Blog }) => {
  return (
    <>
      <Breadcrumb
        title={"Blog Details With Sidebar"}
        pages={["blog details sidebar"]}
      />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-12.5">
            {/* <!-- blog details --> */}
            <div className="lg:max-w-[750px] w-full">
              <div className="rounded-[10px] overflow-hidden mb-7.5">
                <Image
                  className="rounded-[10px] h-[477px] w-full object-cover"
                  src={
                    blogData.mainImage
                      ? imageBuilder(blogData?.mainImage).url()!
                      : "/no image"
                  }
                  alt="details"
                  width={750}
                  height={477}
                />
              </div>

              <div>
                <span className="flex items-center gap-3 mb-4">
                  <a href="#" className="ease-out duration-200 hover:text-blue">
                    {blogData.publishedAt &&
                      new Date(blogData.publishedAt)
                        .toDateString()
                        .split(" ")
                        .slice(1)
                        .join(" ")}
                  </a>

                  {/* <!-- divider -`-> */}
                  <span className="block w-px h-4 bg-gray-4"></span>

                  <a href="#" className="ease-out duration-200 hover:text-blue">
                    300k Views
                  </a>
                </span>

                <h2 className="font-medium text-dark text-xl lg:text-2xl xl:text-custom-4xl mb-4">
                  {blogData?.title}
                </h2>

                <div className="blog-details">
                  <PortableText value={blogData?.body as any} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-10 mt-10">
                  <div className="flex flex-wrap items-center gap-5">
                    <p>Tags :</p>

                    <ul className="flex flex-wrap items-center gap-3.5">
                      {blogData?.tags?.map((tag, key) => (
                        <li key={key}>
                          <Link
                            className="inline-flex hover:text-white border border-gray-3 bg-white py-2 px-4 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue capitalize"
                            href={`/blogs/tags/${tag}`}
                          >
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SocialShare slug={blogData?.slug} />
                </div>
              </div>
            </div>

            {/* <!-- blog sidebar --> */}
            <div className="lg:max-w-[370px] w-full">
              {/* <!-- search box --> */}
              <SearchForm />

              {/* <!-- Recent Posts box --> */}
              <LatestPosts />

              {/* <!-- Latest Products box --> */}
              <LatestProducts />

              {/* <!-- Popular Category box --> */}
              <Categories />

              {/* <!-- Tags box --> */}
              <Tags />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsWithSidebar;
