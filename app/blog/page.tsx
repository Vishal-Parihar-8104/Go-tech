import React from "react";
import Link from "next/link";
import Image from "next/image";

function BlogPage() {
  const blogs = [
    {
      slug: "google-sage-agentic-ai-research",
      title: "Google's SAGE Agentic AI Research: What It Means for SEO in 2026",
      description:
        "Exploring how Google's new agentic AI research will change SEO strategies.",
      image:
        "https://go-techsolution.com/wp-content/uploads/2026/01/a-dramatic-photograph-of-a-determined-wo_p-wqp3KcS2m8-8TOxvisA_Jfu9z6HFSKq51k92-eDXow.webp",
      content: "Full content here...",
    },
    {
      slug: "ai-recommendations-vary",
      title: "AI Recommendations Vary With Nearly Every Query",
      description: "How AI-generated results differ for each search query.",
      image:
        "https://go-techsolution.com/wp-content/uploads/2026/01/a-flat-vector-illustration-featuring-a-f_rZjarMgwTkegN3q6Qg1bnQ_2ZKJYcpjT2WIJJFM9TdvMg.webp",
      content: "Full content here...",
    },
    {
      slug: "ai-recommendations-vary-personalized",
      title: "Personalized AI Recommendations in Search",
      description: "How AI adapts recommendations based on user behavior.",
      image:
        "https://go-techsolution.com/wp-content/uploads/2026/01/a-flat-vector-illustration-featuring-a-f_rZjarMgwTkegN3q6Qg1bnQ_2ZKJYcpjT2WIJJFM9TdvMg.webp",
      content: "Full content here...",
    },
    {
      slug: "ai-recommendations-vary-search-results",
      title: "Why AI Search Results Keep Changing",
      description: "Understanding the variability in AI-powered search results.",
      image:
        "https://go-techsolution.com/wp-content/uploads/2026/01/a-flat-vector-illustration-featuring-a-f_rZjarMgwTkegN3q6Qg1bnQ_2ZKJYcpjT2WIJJFM9TdvMg.webp",
      content: "Full content here...",
    },
  ];

  return (
    <div className="max-w-7xl  mx-auto pl-20 py-16">
      <div className="mx-4 my-3 ">
        <h1 className="text-3xl font-bold text-[#2b428c]">BLOGS</h1>

        <p className="mt-3 text-[#2b428c] max-w-2xl">
          Exploring the Latest in Web Development, Technology, and Digital
          Marketing with Go-Tech Solution, Udaipur, India
        </p>

        {/* BLOG GRID */}
        <div className="grid md:grid-cols-2 gap-10 mt-14 pt-13">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block">
              <article>
                {/* IMAGE */}
              <div className="overflow-hidden h-64 rounded-lg  w-full">
  <Image
    src={blog.image}
    alt={blog.title}
    width={800}
    height={1200}
    className="  h-[533px]  object-contain group-hover:scale-105 transition-transform duration-300"
  />
</div>


                {/* CONTENT */}
                <h2 className="mt-5 text-lg font-bold text-blue-900 uppercase">
                  {blog.title}
                </h2>

                <p className="mt-2 text-blue-800">{blog.description}</p>

                <span className="inline-flex items-center gap-2 mt-3 text-blue-700 font-semibold">
                  View More →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
