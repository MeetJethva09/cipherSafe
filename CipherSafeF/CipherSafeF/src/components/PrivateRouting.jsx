import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const PrivateRouting = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
      
      
        if(!id || !token)
        {
            navigate('/login')
        }
    },[]);
        return <Outlet/>
}
