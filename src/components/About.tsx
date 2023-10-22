import React from 'react'
import { fe, be, frameworks, others } from '../pages/constants'


const About:React.FC = () => {
    console.log(fe,be)
  return (
    <section id="about" className='w-full'>
        <div className="px-4 border-2 border-white/30 rounded-lg w-full py-2 mx-auto flex flex-col gap-5">
        <h3 className='text-[30px] font-bold'>Skills</h3>
        <div className='flex flex-wrap gap-6 md:gap-8 justify-center'>
          {fe.map(skill => (
            <div key={skill.id} className='flex flex-col items-center font-sans gap-2'>
              <img src={skill.pic} alt={`${skill.name} logo`} className='w-10 h-10'/>
              {skill.name}
            </div>
          ))}
        </div>
        <hr />
        <div className='flex flex-wrap gap-6 md:gap-8 justify-center'>
          {be.map(skill => (
            <div key={skill.id} className='flex flex-col items-center font-sans gap-2'>
              <img src={skill.pic} alt={`${skill.name} logo`} className='w-10 h-10'/>
              {skill.name}
            </div>
          ))}
        </div>
        <hr />
        <div className='flex flex-wrap gap-6 md:gap-8 justify-center'>
          {frameworks.map(skill => (
            <div key={skill.id} className='flex flex-col items-center font-sans gap-2'>
              <img src={skill.pic} alt={`${skill.name} logo`} className='w-10 h-10'/>
              {skill.name}
            </div>
          ))}
        </div>
        <hr />
        <div className='flex flex-wrap gap-6 md:gap-8 justify-center'>
          {others.map(skill => (
            <div key={skill.id} className='flex flex-col items-center font-sans gap-2'>
              <img src={skill.pic} alt={`${skill.name} logo`} className='w-10 h-10'/>
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About