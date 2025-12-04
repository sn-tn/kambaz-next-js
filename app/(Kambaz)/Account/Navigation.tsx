/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
            {link}
          </NavLink>
        </NavItem>
      ))}
      {currentUser && (currentUser as any).role === "ADMIN" && (
        <NavLink
          as={Link}
          href={`/Account/Users`}
          active={pathname.endsWith("Users")}
        >
          Users
        </NavLink>
      )}
    </Nav>
    // <div id="wd-account-navigation" className="wd list-group fs-6 rounded-0 text-nowrap">
    //   <Link href="Signin" className="list-group-item active border-0">Signin</Link>
    //   <Link href="Signup" className="list-group-item text-danger border-0">Signup</Link>
    //   <Link href="Profile" className="list-group-item text-danger border-0">Profile</Link>
    // </div>
  );
}
