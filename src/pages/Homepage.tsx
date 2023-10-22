import profile_pic from '../assets/profile-pic.jpg';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Homepage = () => {
  return (
    // <div className='relative w-full h-full mx-auto pt-20 -sm:px-5 px-20'>
    <>
      <div id="home" className='flex flex-col mx-auto items-center max-w-[960px] min-h-[95vh] relative gap-10'>
        <div className='flex flex-col gap-20  items-center'>
          <img src={profile_pic} alt="" className='w-[270px] h-[270px] object-cover rounded-[50%]'/>
          <div className='sm:text-[25px]'>
            <p className='text-[40px] whitespace-nowrap font-bold'>Hey, it's Nguyen<span className="wave">👋</span></p>
            <div className='max-w-[960px] w-full text-justify'>
              I am a recent Computing Science graduate from the University of Alberta.
              My expertise is in Software Development. Please don't hesitate to contact me if you'd like to delve further into my skills,
              experience, and how I can contribute positively to your goals!
            </div>
          </div>
        </div>
        <About />
        <a href='#projects'
          className='text-[30px] animate-bounce'>
          <i className="fa-solid fa-arrow-down">
        </i></a>
        
      </div>
      <Projects />
      <Contact />
    </>
  )
}

export default Homepage