import { Outlet } from 'react-router-dom';
import React from 'react';
import NavBar from '../components/NavBar';
import StarsScene from './Background';

const MainLayout:React.FC = () => {
  return (
    <div className='text-white'>
      <StarsScene />
      <div className='absolute w-full h-full flex flex-col justify-between'>
        <NavBar />
        <div className='grow flex flex-col gap-14 px-8 max-w-[1440px] mx-auto pt-12'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout