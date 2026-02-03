import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ menuTitle, description, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("center");

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) setPosition("right");
      else if (rect.left < 0) setPosition("left");
      else setPosition("center");
    }
  }, [isOpen]);

  const lower = menuTitle.toLowerCase();
  const isProjects = lower === "projects";
  const isIndustries = lower === "industries";
  const isTechStack = lower === "tech stack" || lower === "techstack" || lower === "tech";
  const isCompany = lower === "company";
  const sections = Array.isArray(data) ? data : [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* TRIGGER */}
      <button
        className={`flex items-center gap-1 font-semibold text-sm uppercase
        ${isOpen ? "text-blue-600" : "text-slate-700"}`}
      >
        {menuTitle}
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN */}
      <div
        ref={dropdownRef}
        className={`
        absolute top-full pt-4 w-screen max-w-6xl z-50 px-6
        transition-all duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        ${position === "center" ? "left-1/2 -translate-x-1/2" : ""}
        ${position === "right" ? "right-0" : ""}
        ${position === "left" ? "left-0" : ""}
      `}
      >
        <div className="bg-white rounded-xl shadow-2xl border overflow-hidden">

{/* =================================================== */}
{/* ================= PROJECTS MENU ================= */}
{/* =================================================== */}

{isProjects && (
  <div className="grid grid-cols-3 min-h-[420px]">

    {/* LEFT */}
    <div className="p-10 bg-slate-50">
      <h3 className="text-xl font-bold text-blue-900">
        {data.featured.title}
      </h3>
      <p className="text-sm text-slate-600 mt-1">
        {data.featured.subtitle}
      </p>

      <img
        src={data.featured.image}
        className="mt-6 rounded-lg shadow-md"
        alt=""
      />
    </div>

    {/* MIDDLE */}
    <div className="p-10">
      <h4 className="text-sm font-bold text-slate-400 uppercase mb-6">
        All Industries
      </h4>

      <ul className="space-y-4">
        {data.industries.map((item, i) => (
          <li key={i} className="flex gap-3 font-medium text-blue-900">
            <span>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT */}
    <div className="p-10 flex items-center justify-center bg-slate-50">
      <img
        src={data.previewImage}
        className="rounded-xl shadow-lg max-h-[300px]"
        alt=""
      />
    </div>

  </div>
)}

{/* =================================================== */}
{/* ================= INDUSTRIES MENU ================= */}
{/* =================================================== */}

{isIndustries && (
  <div className="flex min-h-[360px]">

    {/* LEFT PANEL */}
    <div className="w-1/3 bg-slate-50 p-10">
      <h2 className="text-2xl font-bold text-blue-900 uppercase">
        Industries
      </h2>

      <p className="mt-4 text-slate-600 text-sm">
        {description}
      </p>
    </div>

    {/* RIGHT PANEL */}
    <div className="w-2/3 p-10">

      <div className="grid grid-cols-2 gap-y-5 gap-x-16">
        {data.industries.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="text-blue-900 font-medium hover:text-blue-600"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="/industries"
          className="text-blue-900 font-bold uppercase text-sm hover:underline"
        >
          All Industries →
        </a>
      </div>

    </div>

  </div>
)}

{/* =================================================== */}
{/* ================= TECH STACK MENU ================= */}
{/* =================================================== */}

{isTechStack && (
  <div className="flex min-h-[360px]">

    {/* LEFT PANEL */}
    <div className="w-1/3 bg-slate-50 p-10">
      <h2 className="text-2xl font-bold text-blue-900 uppercase">{menuTitle}</h2>
      <p className="mt-4 text-slate-600 text-sm">{description}</p>
    </div>

    {/* RIGHT PANEL: three columns */}
    <div className="w-2/3 p-10">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Front-End</h4>
          <ul className="space-y-3">
            {(data.frontend || []).map((t, i) => (
              <li key={i} className="text-blue-900 font-medium">{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Back-End</h4>
          <ul className="space-y-3">
            {(data.backend || []).map((t, i) => (
              <li key={i} className="text-blue-900 font-medium">{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">Mobile</h4>
          <ul className="space-y-3">
            {(data.mobile || []).map((t, i) => (
              <li key={i} className="text-blue-900 font-medium">{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <a href="/tech-stack" className="text-blue-900 font-bold uppercase text-sm hover:underline">All Technologies</a>
      </div>
    </div>

  </div>
)}

{/* =================================================== */}
{/* ================= COMPANY MENU ================= */}
{/* =================================================== */}

{isCompany && (
  <div className="flex min-h-[360px]">

    {/* LEFT PANEL */}
    <div className="w-1/3 bg-slate-50 p-10">
      <h2 className="text-2xl font-bold text-blue-900 uppercase">{menuTitle}</h2>
      <p className="mt-4 text-slate-600 text-sm">{description}</p>
    </div>

    {/* RIGHT PANEL */}
    <div className="w-2/3 p-10">
      {/* links - use provided data if available, else fallback */}
      <div className="space-y-4">
        {(Array.isArray(data) && data.length > 0
          ? data.flatMap((s) => (Array.isArray(s.links) ? s.links : []))
          : [
              { label: "Referral Program", href: "/referral-program" },
              { label: "Blogs", href: "/blogs" },
              { label: "Contact", href: "/contact" },
            ]
        ).map((link, i) => (
          <a key={i} href={link.href} className="block text-blue-900 font-medium hover:text-blue-600">
            {link.label}
          </a>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">About Us</h4>
        {/* optional extra links under About Us could go here */}
      </div>

    </div>

  </div>
)}

{/* =================================================== */}
{/* ================= DEFAULT MENUS ================= */}
{/* =================================================== */}
{!isProjects && !isIndustries && !isTechStack && !isCompany && (
  <div className="flex min-h-[400px]">

    {/* LEFT */}
    <div className="w-1/3 bg-slate-50 p-10">
      <h2 className="text-2xl font-bold text-blue-900 uppercase">{menuTitle}</h2>
      <p className="mt-4 text-slate-600 text-sm">{description}</p>
    </div>

    {/* RIGHT */}
    <div className="w-2/3 p-10 grid grid-cols-3 gap-8">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">{section.category}</h4>

          <ul className="space-y-2">
            {(Array.isArray(section.links) ? section.links : []).map((link, i) => (
              <li key={i}>
                <a href={link.href} className="text-blue-900 hover:text-blue-600 text-sm">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>


  </div>
)}


        </div>
        <h4 className="pb-10 text-[#000]">
   All Categories
  </h4>
            
      </div>
    </div>
  );
};

export default Dropdown;
