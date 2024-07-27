import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import AddCampaign from './components/CreateCampaign';
import CampaignDetails from './components/CampaignDetails';

const router = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>,
      },
      {
        path: '/payment',
        element: <Dashboard/>,
      },
      {
        path: '/profile',
        element: <Profile/>,
      },
      {
        path: '/logout',
        element: <Dashboard/>,
      },
      {
        path: '/addCampaign',
        element: <AddCampaign/>,
      },
      {
        path: '/campaign/:id',
        element: <CampaignDetails/>,
      },
    ],
  },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
