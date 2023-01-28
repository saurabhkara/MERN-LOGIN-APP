import React from 'react';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import { PageNotFound, Profile, UserName,Password,Register,Reset,Recovery} from './components';
import { getAuthenticate, getUser } from './helper/apiHelper';

export default function App() {

     async function apitrial(){
        let data = await  getUser('example123');
        // let data = await  getAuthenticate('example123');
        console.log(data);
     }
    //  apitrial();
     console.log(process.env.REACT_APP_SERVER_URL);
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
