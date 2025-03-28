import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';


//import Modal from './pages/Modal';


function App() {

  return (
    <div>
      <Navbar /> 
      <main className='container pt-5'>
        <Outlet />


          {/* <Modal /> */}

      </main>
    </div>
  )
}

export default App
