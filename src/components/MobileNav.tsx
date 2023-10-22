import React, {useState} from 'react'
import navLinks from '../common/constants';
import { Link } from 'react-router-dom';


const MobileNav:React.FC = () => {
    const [openNav, setOpenNav] = useState(false);

    const toggleOpenNav = () => {
        setOpenNav(prev => {
            // if (prev) {
            //     document.body.style.overflow = 'auto'
            // }
            return !prev;
        })
    }
  return (
    <div className='sm:hidden'>
        <button onClick={toggleOpenNav}>
            {openNav ? (
                <i className="fa-solid fa-x"></i>
            ) : ( 
                <i className="fa-solid fa-bars"></i>
            )}
        </button>
        <div className={`fixed top-[5rem] right-0 h-screen w-full 
             bg-primary/90
            duration-300 ease-in-out
            ${openNav ? 'translate-x-0' : 'translate-x-full'}
            `}>
            <button 
                className='w-full h-full fixed' 
                aria-label='Close modal'
                onClick={toggleOpenNav} /> 
            <nav className='fixed mt-6'>
                {navLinks.map(link => (
                    <div key={link.title} className='text-2xl px-12 py-4 tracking-wide'>
                        <Link to={link.href} onClick={toggleOpenNav}>{link.title}</Link>
                    </div>
                ))}
            </nav>
        </div>
    </div>
  )
}

export default MobileNav