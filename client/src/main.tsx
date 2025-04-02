import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import './index.css';
import "./App.css";

import App from './App.tsx';

//pages
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Match from './pages/Match.tsx';
import Profile from './pages/Profile.tsx';
import Discover from './pages/Discover.tsx';
import Flickpicks from './pages/Flickpicks.tsx';
import Test from './pages/StyleTestPage.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/match',
        element: <Match />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/flickpicks',
        element: <Flickpicks />
      },
      {
        path: '/discover',
        element: <Discover />
      },  
      {
        path: '/test',
        element: <Test />
      }, 
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
