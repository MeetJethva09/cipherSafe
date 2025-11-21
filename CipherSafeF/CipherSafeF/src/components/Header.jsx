import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Icon = ({ children, className = '' }) => (

    <svg className={`w-5 h-5 flex-shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {children}
    </svg>
);

const HomeIcon = () => (
    <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/></Icon>
);
const VaultIcon = () => (
    <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M15 9V5a3 3 0 00-6 0v4m0 4v3.25A2.75 2.75 0 0012 20.25a2.75 2.75 0 002.75-2.75V13.5m-3.75 0V9m0-4h4.5m-4.5 0h-4.5" /></Icon>
);
const SettingsIcon = () => (
    <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M10 21.75V4.75a2 2 0 012-2h4a2 2 0 012 2v17M17.25 7h4.5m-4.5 3h4.5M10 7H3.5a2 2 0 00-2 2v10a2 2 0 002 2h6.5"/></Icon>
);

export const Header = () => {
        const navigate = useNavigate()
        const location = useLocation()
      const [user , setUser] = useState ({});
    
        const getUserData = async () =>{
            try {
                const id = localStorage.getItem('id');
                const res = await axios.get("/user/getuserbyid/"+id); 
                setUser(res.data.data);
               
            } catch(error) {
                 console.error("Error fetching user data:", error);
            }
        } 	
   
    const logoutAction = async () =>{
        try{
            const res = await axios.get('/user/logout' , {withCredentials : true});
            localStorage.clear();
            navigate('/login');
        }
        catch(err)
        {
            console.log('Error while logout' , err)
        }
       
    }

        useEffect(()=>{
            getUserData()
        },[location.pathname])
       

  return (
    <div>

<header className="relative z-20 bg-gray-900 shadow-xl border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                    
                    <div className="flex items-center space-x-4">
                        <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75A3.75 3.75 0 1012 10.5h.002v.002h-.002a3.75 3.75 0 00-3.75 3.75V18" />
                        </svg>
                        <span className="text-2xl font-black text-white tracking-widest">Cipher<span className='text-lime-400'>Safe</span></span>
                    </div>

               
                    <nav className="flex space-x-6">
                        <Link to="/view/dashboard" className="flex items-center space-x-2 py-2 px-3 rounded-lg text-lime-400 font-semibold bg-gray-800 ring-2 ring-lime-500/50 transition duration-200">
                            <HomeIcon />
                            <span>Dashboard</span>
                        </Link>
                        <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-300 hover:text-lime-400 hover:bg-gray-800 transition duration-200">
                            <VaultIcon />
                            <span>My Vaults</span>
                        </a>
                        <a href="#" className="flex items-center space-x-2 py-2 px-3 rounded-lg text-gray-300 hover:text-lime-400 hover:bg-gray-800 transition duration-200">
                            <SettingsIcon />
                            <span>Settings</span>
                        </a>
                    </nav>

                   
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-400 text-sm hidden sm:inline">Welcome, **{user.username}**</span>
                        <button onClick={logoutAction} className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-red-800/30 border border-red-800 text-red-400 hover:bg-red-800/50 transition duration-200 font-semibold">
                            <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0021.75 12c0-1.767-.674-3.422-1.882-4.646M18 10c.594-.132 1.157-.39 1.666-.75M2 10h16.5a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 19.5v-6.75A2.25 2.25 0 012.25 10zM12 2.25a.75.75 0 01.75.75V6h-.75V3a.75.75 0 01.75-.75z"/></Icon>
                            <span>Logout</span>
                        </button>
                    </div>

                </div>
            </header>

            <div>
          <Outlet context={{user}}/>
        </div>

    </div>
  )
}
