import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import { PageNotFound, Profile, UserName,Password,Register,Reset,Recovery} from './components';

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
            element: <Password></Password>
        },
        {
            path:'/reset',
            element: <Reset></Reset>
        },
        {
            path:'/profile',
            element: <Profile></Profile>
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
