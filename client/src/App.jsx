import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import { PageNotFound, Profile, UserName,Password,Register,Reset,Recovery} from './components';
import { Authorize, ProtectRoute } from './middleware/auth';

export default function App() {

    const router = createBrowserRouter([
        {
            path:'/',
            element: <UserName></UserName>
        },
        {
            path:'/register',
            element: <Register></Register>
        },
        {
            path:'/password',
            element: <ProtectRoute><Password /></ProtectRoute>
        },
        {
            path:'/reset',
            element: <Reset></Reset>
        },
        {
            path:'/profile',
            element: <Authorize><Profile /></Authorize>
        },
        {
            path:'/recovery',
            element: <Recovery></Recovery>
        },
        {
            path:'*',
            element: <PageNotFound></PageNotFound>
        },
    ])
     
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
