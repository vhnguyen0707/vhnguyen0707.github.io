import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import MobileNav from "./MobileNav";

export const navLinks = [
    { title: "About", href: "/#about"},
    { title: "Experiences", href: "/#experiences"},
    { title: "Projects", href: "/#projects"},
    { title: "Contact", href: "/#contact" },
    { title: "Resume", href: "/resume" },
];

export default function NavBar() {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo-link">
                    <span className="navbar-logo">Nguyen Vu</span>
                </Link>
                <div className="navbar-right">
                    <MobileNav />
                    <nav>
                        <ul className="navbar-links">
                            {navLinks.map((link) => (
                                <li key={link.title} className="navbar-link">
                                    <HashLink smooth to={link.href}>{link.title}</HashLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};
