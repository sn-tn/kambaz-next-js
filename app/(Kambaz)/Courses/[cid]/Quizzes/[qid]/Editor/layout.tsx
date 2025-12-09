"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function QuizEditorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  return (
    <div>
      <Nav variant="tabs">
        <NavItem>
          <NavLink
            href="./DetailsEditor"
            className={`${pathname.endsWith("DetailsEditor") ? "active" : "text-danger"}`}
          >
            Details
          </NavLink>
        </NavItem>
                <NavItem>
          <NavLink
            href="./QuestionsEditor"
            className={`${pathname.endsWith("QuestionsEditor") ? "active" : "text-danger"}`}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>
      {children}
    </div>
  );
}
