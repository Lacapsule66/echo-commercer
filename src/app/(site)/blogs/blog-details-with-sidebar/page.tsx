import BlogDetailsWithSidebar from "@/components/BlogDetailsWithSidebar";
import { getPost } from "@/sanity/sanity-blog-uitls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Details Page | NextMerce | Next.js E-commerce Boilerplate",
  description: "This is Blog Details Page for NextMerce Template",
  // other metadata
};

const BlogDetailsWithSidebarPage = async () => {
  const slug = "cooking-masterclass-creating-delicious-italian-pasta";

  const blogData = await getPost(slug);

  if (!blogData) {
    return <div>Article non trouvé.</div>;
  }

  return (
    <main>
      <BlogDetailsWithSidebar blogData={blogData} />
    </main>
  );
};

export default BlogDetailsWithSidebarPage;
