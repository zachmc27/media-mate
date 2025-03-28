import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Match from './pages/Match.tsx';
import Profile from './pages/Profile.tsx';
import Flickpicks from './pages/Flickpicks.tsx';

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
      }    
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
