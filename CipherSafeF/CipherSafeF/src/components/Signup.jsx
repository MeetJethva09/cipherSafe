// src/components/SignupPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {Bounce , toast , ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const {register , handleSubmit} = useForm({})

    const submitHandler = async (data) =>{
      try{
        const res = await axios.post('/user/signup',data , {withCredentials : true});
        toast.success('Signup Success..', {
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
              navigate('/login')
          },2000)
      }
      catch(err){
          if(err.status === 401)
          {
            toast.warning(`Password doesn't match!!!`, {
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
                  navigate('/signup')
              },2000)
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
          Create Your <span className="text-lime-400">Vault</span>
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              {...register('username')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="Choose a username"
            />
          </div>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="Number"
              id="number"
              name="phone"
              {...register('phoneNumber')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="12345678989"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Master Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              {...register('password')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="Your secure master password"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              {...register('confirmPassword')}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white"
              placeholder="Confirm your master password"
            />
             <label htmlFor="" className="block text-sm font-medium text-gray-300 mb-2">
              Category 
              </label>
             <select name=""  {...register('category')}className='w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent text-white'>
                <option disabled>Select Category</option>
                <option value="Work">Work</option>
                <option value="Social">Social</option>
             </select>
          </div>
          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-lime-400 transition duration-300 shadow-lg text-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-lime-400 hover:text-lime-300">
            Login
          </Link>
        </div>
      </div>
    </div>
    </>
  );
  
};

export default Signup;