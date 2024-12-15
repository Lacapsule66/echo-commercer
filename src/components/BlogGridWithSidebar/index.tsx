import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import BlogItem from "../Blog/BlogItem";
import SearchForm from "../Blog/SearchForm";
import LatestPosts from "../Blog/LatestPosts";
import LatestProducts from "../Blog/LatestProducts";
import Categories from "../Blog/Categories";
import Tags from "../Blog/Tags";
import { getPosts } from "@/sanity/sanity-blog-uitls";
// import GlobalSearchModal from "../Common/GlobalSearch";

const BlogGridWithSidebar = async () => {
  const blogData = await getPosts();

  return (
    <>
      <Breadcrumb title={"Blog Grid Sidebar"} pages={["blog grid sidebar"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5">
            {/* <!-- blog grid --> */}
            <div className="lg:max-w-[770px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-7.5">
                {blogData &&
                  blogData.map((blog, key) => (
                    <BlogItem blog={blog} key={key} />
                  ))}
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

export default BlogGridWithSidebar;
