// src/components/HeroSection.jsx

import React from 'react';
import {Link} from 'react-router-dom'

const HeroSection = () => {
  return (
   <section className="relative bg-gray-900 text-gray-50 min-h-screen flex items-center justify-center p-4">
    {/* Dark Matter Background Pattern */}
    <div className="absolute inset-0 z-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234a5568\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

    <div className="relative z-10 max-w-5xl mx-auto ...">
        {/* Left Side: Text Content */}
        <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Unbreakable Protection. <br className="hidden sm:inline" />
                <span className="text-lime-400">Zero-Knowledge.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-70">
                A simple, powerful, and encrypted vault built by engineers, for engineers.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center md:justify-start">
                <Link to={'/signup'}>
                <button className="bg-lime-500 text-gray-900 hover:bg-lime-400 font-bold py-3 px-8 rounded-lg shadow-xl transition ...">
                    Create Vault Now
                </button>
                </Link>
                <button className="border border-gray-600 text-gray-300 hover:bg-gray-800 font-bold py-3 px-8 rounded-lg transition ...">
                    View Docs
                </button>
            </div>
        </div>
        {/* Right Side: Illustrative Icon (Use a sharp, angular icon) */}
        <div className="flex-1 flex justify-center items-center ...">
            <svg className="w-64 h-64 text-lime-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-6.75 0h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25H2.25A2.25 2.25 0 0 1 0 20.25v-7.5A2.25 2.25 0 0 1 2.25 10.5Z" />
            </svg>
        </div>
    </div>
</section>
  );
};

export default HeroSection;