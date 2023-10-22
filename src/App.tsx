import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Resume from './pages/Resume';
import MainLayout from './common/MainLayout';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App