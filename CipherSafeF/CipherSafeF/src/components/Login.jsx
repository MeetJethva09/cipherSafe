// src/components/LoginPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { ToastContainer , Bounce , toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {register , handleSubmit} = useForm({})
    

    const submitHandler = async (data) =>{
      try{
        const res = await axios.post('/user/login' , data , {withCredentials :true })
        console.log(res.data.data._id);
        localStorage.setItem('id' , res.data.data._id);
        localStorage.setItem('token' , res.data.token);

        toast.success('Login Success..', {
          position: "top-right",
          autoClose: 1800,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
          setTimeout(()=>{
              navigate('/view/dashboard')
          },2000)
      }
      catch(err)
      {
            if(err.response.status === 404)
            {
              toast.warning(err.response.data.message , {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            }
            else
            {
              toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            }

      }
    }

  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={1800}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
      />


    <div className="relative bg-gray-900 min-h-screen flex items-center justify-center p-4">
      {/* Dark Matter Background Pattern */}
      <div className="absolute inset-0 z-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%234a5568\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zm1 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 w-full max-w-md bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-8 space-y-8">
        <h2 className="text-3xl font-bold text-center text-white">
          Access Your <span className="text-lime-400">Account</span>
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register('email')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="Your Master Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-lime-500 focus:ring-lime-500 border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <Link to="/forgotpass" className="text-sm font-medium text-lime-400 hover:text-lime-300">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-lime-400 transition duration-300 shadow-lg text-lg"
          >
            Login 
          </button>
        </form>
        <div className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-lime-400 hover:text-lime-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;