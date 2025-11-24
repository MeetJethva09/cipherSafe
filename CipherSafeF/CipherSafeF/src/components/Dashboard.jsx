// src/pages/MemberDashboardPage.jsx (No Sidebar, Header Navigation)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useOutletContext } from 'react-router-dom';



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



// --- Main Dashboard Component ---

const Dashboard = () => {
    const { user } = useOutletContext();
    const [vaults , setVaults] = useState([]) 

    const getVaultById = async () =>{
        let id = localStorage.getItem('id');
        const res = await axios.get(`/vault/getvaultbyid/${id}`);
        setVaults(res.data.data)
    }

    const isTime = user.lastLogin;
    const istDate = new Date(isTime).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
      });
      
    const deleteAction = async (vid) =>{
        const res = await axios.delete('/vault/deletebyid/'+vid);
        getVaultById()
    }
    

useEffect(()=>{
    getVaultById()
},[])

    return (
        // Full width container with dark theme
        
        <div className="relative bg-gray-950 min-h-screen flex flex-col text-gray-50"> 
            
            {/* Pulsating Abstract Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ 
                backgroundImage: 'radial-gradient(at 0% 0%, rgb(80, 80, 80) 0, transparent 40%), radial-gradient(at 100% 100%, rgb(40, 40, 40) 0, transparent 40%)'
            }}></div>
          
            

            {/* Main Content Area (Full Width) */}
            <main className="relative z-10 flex-1 p-8 sm:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
                
                {/* Dashboard Title Header */}
                <header className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-400 text-lg sm:text-xl">Your secure digital fortress awaits, <span className='text-yellow-600'>**{user?.username}**.</span></p>
                </header>
                
                {/* --- Section 1: User Profile/Summary Cards --- */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {/* Summary Card 1: Vault Count */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border-t-4 border-lime-500 flex flex-col justify-center transform hover:scale-[1.02] transition duration-300">
                        <p className="text-sm font-semibold text-lime-400 uppercase tracking-wider">Total Vaults</p>
                        <p className="text-white text-4xl mt-1 font-extrabold">{vaults.length}</p>
                    </div>
                    {/* Summary Card 2: Last Login */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border-t-4 border-cyan-500/80 flex flex-col justify-center transform hover:scale-[1.02] transition duration-300">
                        <p className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Last Activity</p>
                        <p className="text-white text-xl mt-1">{istDate}</p>
                    </div>
                    {/* Summary Card 3: Profile Settings */}
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border-t-4 border-gray-600 flex flex-col justify-center transform hover:scale-[1.02] transition duration-300">
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Security Status</p>
                        <p className="text-green-400 text-xl mt-1 font-semibold">Excellent</p>
                    </div>
                    {/* Action Card: Edit Profile */}
                    <Link to={`/view/profile/${localStorage.getItem('id')}`} className="bg-lime-500 text-gray-900 font-extrabold p-6 rounded-xl shadow-xl hover:bg-lime-400 transition duration-300 transform hover:scale-[1.02]">
                        <span className="block text-2xl">Manage Profile</span>
                        <span className="block text-sm font-medium mt-1">Update details & settings</span>
                    </Link>
                </section>

                {/* --- Section 2: User Vaults List --- */}
                <section className="bg-gray-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-800">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                        <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                            <VaultIcon className="w-7 h-7 text-lime-400"/>
                            <span>Secure Vault Index</span>
                        </h2>
                        
                        <Link to={'/view/vaultadd'} className="bg-lime-500 text-gray-900 font-bold py-2 px-5 rounded-lg hover:bg-lime-400 transition duration-300 transform hover:scale-105 shadow-md shadow-lime-900/50">
                            + Add New Vault
                        </Link>
                    </div>

                    {/* Filter and Table Content */}
                   

                    <div className="overflow-x-auto">
            
                    <table className="min-w-full divide-y divide-gray-800">
                                            <thead className="bg-gray-800/50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-lime-400 uppercase tracking-wider">Name</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-lime-400 uppercase tracking-wider">Category</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-lime-400 uppercase tracking-wider">Username</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-lime-400 uppercase tracking-wider">Last Modified</th>
                                                    <th scope="col" className="relative px-6 py-3"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-800/50">


                                {
                                   vaults.length > 0 ? 
                                   vaults.map((vault)=>{
                                        return ( <>
                                    

                                                <tr className="hover:bg-gray-800 transition duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-white font-semibold">{vault?.vaultName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-800/30 text-cyan-400">{vault?.category}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{vault?.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">{new Date(vault?.updatedAt).toLocaleDateString("en-IN",{
                                                        timeZone : "Asia/Kolkata"
                                                    })}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link to = {`/view/vaultview/${vault._id}`} className="text-cyan-400 hover:text-cyan-300 mr-4 font-bold">View Vault</Link>

                                                        <button onClick={()=>{deleteAction(vault?._id)}}>
                                                            <Link to="#" className="text-red-500 hover:text-red-400 font-bold">Delete</Link>
                                                        </button>
                                                    </td>
                                            </tr>
                                 
                                   </>
                                        )
                                   }) : 
                                   <div>
                                   <p className='min-w-full flex justify-center text-xl text-red-500 text-weight-400'>No vaults found!!</p>
                                   </div>
                                }

                              
                            
                               
                                </tbody>
                                </table>
                    </div>
                </section>
       
            </main>
           
        </div>
     
    );
};

export default Dashboard;