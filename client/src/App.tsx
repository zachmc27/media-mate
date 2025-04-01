import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
