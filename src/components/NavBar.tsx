import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import navLinks from '../common/constants';
import { HashLink } from 'react-router-hash-link';



const NavBar:React.FC = () => {
    //     const [loaded, setLoaded] = useState(false);

    // useEffect(() => setLoaded(true), []);

    return (
        <header className='fixed top-0 z-50 w-full bg-gradient-to-b from-primary/40 to-transparent backdrop-blur-sm h-[50px] px-8 -sm:px-6 py-6 flex items-center'>
            <div className='flex justify-between w-full'>
                <Link to={'/'}><span className='text-2xl font-bold'>Nguyen Vu</span></Link>
                <div className='flex items-center transition-opacity duration-700'>
                    <MobileNav />
                    <nav>
                        <ul className='flex items-center justify-around gap-3 -sm:hidden'>
                            {navLinks.map((link) => (
                                <li key={link.title} className="link">
                                    <HashLink to={link.href}>{link.title}</HashLink>
                                    {/* {link.title!== 'Resume' ? <a href={link.href}>{link.title}</a> : <Link to={link.href}>{link.title}</Link>} */}
                                </li>
                            ))}
                        </ul>

                    </nav>
                </div>
            </div>
        </header>
    )
}

export default NavBar