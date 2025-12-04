"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = [
    {href: "Home", label:"Home"},
    {href: "Modules", label: "Modules"},
    {href: "Piazza", label:"Piazza"},
    {href: "Zoom", label:"Zoom"},
    {href: "Assignments", label:"Assignments"},
    {href: "Quizzes", label: "Quizzes"},
    {href: "Grades", label: "Grades"},
    {href: "People", label: "People"},
  ];
  return (
    <div id="wd-course-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link key={link.label} href={`/Courses/${cid}/${link.href}`} id={`wd-course-${link.label.toLowerCase()}-link`}
        className={`list-group-item border-0 ${pathname.endsWith(link.href) ? "active" : "text-danger"}`}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}