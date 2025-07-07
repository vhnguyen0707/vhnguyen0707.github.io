import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useZoomLevel } from '../hooks/useZoomLevel';
// import MobileNav from './MobileNav'; // Adjust the import path if needed

const navLinks = [
    { title: 'About', href: '/#about' },
    { title: 'Projects', href: '/#projects' },
    { title: 'Contact', href: '/#contact' },
    { title: 'Resume', href: '/resume' },
];

const NavBar: React.FC = () => {
    return (
        <header className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo-link">
                    <span className="navbar-logo">Nguyen Vu</span>
                </Link>
                <div className="navbar-right">
                    {/*<MobileNav />*/}
                    <nav>
                        <ul className="navbar-links">
                            {navLinks.map((link) => (
                                <li key={link.title} className="navbar-link">
                                    <HashLink to={link.href}>{link.title}</HashLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
