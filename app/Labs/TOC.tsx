"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
export default function TOC() {
    const pathname = usePathname();
    const links = [
        { href: "/Labs", label: "Labs", id: "wd-labs-link"},
        { href: "/Labs/Lab1", label: "Lab1", id: "wd-lab-1-link"},
        { href: "/Labs/Lab2", label: "Lab2", id: "wd-lab-2-link"},
        { href: "/Labs/Lab3", label: "Lab3", id: "wd-lab-3-link"},
        { href: "/Labs/Lab4", label: "Lab4", id: "wd-lab-4-link"},
        { href: "/Labs/Lab5", label: "Lab5", id: "wd-lab-5-link"},
        { href: "/", label: "Kambaz", id: "wd-kambaz-link"},
        { href: "https://github.com/sn-tn/kambaz-next-js", label: "GitHub Repo", id: "wd-github-repo-link"}
    ];
    return (
        <Nav variant="pills">
            {links.map((link) => (
                <NavItem key={link.id}>
                    <NavLink as={Link} href={link.href} id={link.id} className={pathname.endsWith(link.href) ? "active" : ""}>
                        {link.label}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
}