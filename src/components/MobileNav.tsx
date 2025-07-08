import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { navLinks } from './NavBar';

const MobileNav: React.FC = () => {
    const [openNav, setOpenNav] = useState(false);

    const toggleOpenNav = () => {
        setOpenNav((prev) => !prev);
    };

    return (
        <div className="mobile-nav">
            <button className="menu-toggle" onClick={toggleOpenNav}>
                {openNav ? (
                    <i className="fa-solid fa-x"></i>
                ) : (
                    <i className="fa-solid fa-bars"></i>
                )}
            </button>

            <div className={`mobile-menu ${openNav ? 'open' : ''}`}>
                <nav className="mobile-menu-nav">
                    {navLinks.map((link) => (
                        <div key={link.title} className="mobile-menu-link">
                            <HashLink
                                smooth
                                to={link.href}
                                onClick={toggleOpenNav}
                            >
                                {link.title}
                            </HashLink>
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileNav;