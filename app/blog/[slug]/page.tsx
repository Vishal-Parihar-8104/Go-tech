"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

/* -------------------------------- TYPES -------------------------------- */

interface Section {
  heading: string;
  content: string;
}

interface BlogPost {
  title: string;
  imageUrl: string;
  slug?: string;
  location?: string;
  published?: string;
  readTime?: string;
  intro?: string;
  sections?: Section[];
}

interface ExploreData {
  categories: {
    [key: string]: BlogPost[];
  };
}

type DisplayPost = {
  categoryName: string;
  categorySlug: string;
  slug: string;
  title: string;
  imageUrl: string;
  location: string;
  published: string;
  readTime: string;
  intro: string;
  sections: Section[];
};

/* -------------------------------- HELPERS -------------------------------- */

const slugify = (text?: string) =>
  text
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "";

const buildPost = (
  categoryName: string,
  title: string,
  imageUrl: string
): DisplayPost => ({
  categoryName,
  categorySlug: slugify(categoryName),
  slug: slugify(title),
  title,
  imageUrl,
  location: "Global",
  published: "31 Jan 2026",
  readTime: "3 Min Read",
  intro: "Exploring the latest insights and stories.",
  sections: [
    {
      heading: "Introduction",
      content: "This is an introduction section.",
    },
  ],
});

/* -------------------------------- PAGE -------------------------------- */

export default function Page() {
  const { slug } = useParams() as { slug: string };

  const [post, setPost] = useState<DisplayPost | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  /* -------------------- FORM STATE -------------------- */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted Successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  /* -------------------- FETCH BLOG -------------------- */

  useEffect(() => {
    fetch("../../../public/data/explore1.json")
      .then((r) => r.json())
      .then((json: ExploreData) => {
        const allPosts = Object.entries(json.categories).flatMap(
          ([category, items]) =>
            items.map((item) => ({
              ...buildPost(category, item.title, item.imageUrl),
              sections: item.sections || [],
              intro: item.intro || "",
            }))
        );

        const found = allPosts.find((p) => p.slug === slug);
        setPost(found || null);
      });
  }, [slug]);

  /* -------------------- TOC OBSERVER -------------------- */

  useEffect(() => {
    if (!post?.sections) return;

    const els = post.sections.map((_, i) =>
      document.getElementById(`section-${i}`)
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const index = els.findIndex((el) => el === e.target);
          if (index !== -1) setActiveSection(index);
        }
      });
    });

    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [post]);

  if (!post) return <p className="p-20 text-center">Post Not Found</p>;

  /* -------------------- UI -------------------- */

  return (
    <main>

{/* ---------------- HERO ---------------- */}

<section
  className="relative bg-no-repeat bg-center bg-contain"
  style={{
    backgroundImage: `url(${post.imageUrl})`,
    minHeight: "320px",
  }}
>
  <div className="absolute inset-0 bg-black/50" />

  <Link
    href="/blog"
    className="absolute top-6 left-6 z-10 text-white"
  >
    <ChevronsLeft size={32} />
  </Link>

  <div className="relative max-w-6xl mx-auto px-6 pt-32 text-white">
    <h1 className="text-3xl font-semibold">{post.title}</h1>
  </div>
</section>

{/* ---------------- CONTENT ---------------- */}

<section className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-12 gap-10">

{/* TOC */}
<aside className="lg:col-span-3 hidden lg:block sticky top-24">
  <h3 className="font-semibold mb-4">Table of Contents</h3>
  {post.sections.map((s, i) => (
    <a
      key={i}
      href={`#section-${i}`}
      className={`block py-2 ${
        activeSection === i ? "text-orange-500" : ""
      }`}
    >
      {s.heading}
    </a>
  ))}
</aside>

{/* BLOG */}
<div className="lg:col-span-6">

<p className="mb-8">{post.intro}</p>

{post.sections.map((sec, i) => (
  <div id={`section-${i}`} key={i} className="mb-10">
    <h2 className="text-2xl font-semibold mb-2">{sec.heading}</h2>
    <p>{sec.content}</p>
  </div>
))}

</div>

{/* FORM */}
<aside className="lg:col-span-3">

<h3 className="font-semibold mb-4">Book a Call</h3>

<form onSubmit={handleSubmit} className="space-y-4">

<input
  name="name"
  placeholder="Full Name *"
  value={formData.name}
  onChange={handleChange}
  required
  className="w-full border p-3"
/>

<input
  type="email"
  name="email"
  placeholder="Email *"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full border p-3"
/>

<input
  name="phone"
  placeholder="Phone *"
  value={formData.phone}
  onChange={handleChange}
  required
  className="w-full border p-3"
/>

<select
  name="service"
  value={formData.service}
  onChange={handleChange}
  required
  className="w-full border p-3"
>
  <option value="">Select Service</option>
  <option>Web Development</option>
  <option>Mobile App</option>
  <option>Digital Marketing</option>
</select>

<textarea
  name="message"
  rows={4}
  placeholder="How can we help you?"
  value={formData.message}
  onChange={handleChange}
  className="w-full border p-3"
/>

<button className="w-full bg-orange-500 text-white py-3">
  SEND
</button>

</form>

</aside>

</section>

</main>
  );
}
