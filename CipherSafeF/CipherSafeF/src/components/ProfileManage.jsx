import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast , ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const ProfileManage = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const {register , handleSubmit} = useForm({
        defaultValues : async () =>{
            const res = await axios.get('/user/getuserbyid/'+id);
            return res.data.data;
        }
    })

    const submitHandler = async (data) =>{
        try{
            const res = await axios.patch('/user/profile/'+id , data);
            toast.success('Credentials are Updated..', {
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
            throw err;
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


           <div className='w-full h-screen flex justify-center items-center bg-gray-900'>

<div className="bg-gray-900 rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-800 max-w-lg mx-auto">
    <h3 className="text-2xl font-bold text-cyan-400 mb-6 border-b border-gray-800 pb-3">
        Edit Account Details
    </h3>
    
    {/* Form structure placeholder */}
    <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
        
        {/* Username Field */}
        <div>
            <label htmlFor="edit-username" className="block text-sm font-medium text-gray-400 mb-2">
                Username
            </label>
            <input
                type="text"
                name="username"
                {...register('username')}
                placeholder="Username"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition duration-200"
            />
        </div>

        {/* Email Field */}
        <div>
            <label htmlFor="edit-email" className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
            </label>
            <input
                type="email"
                name="email"
                {...register("email")}
                placeholder="....@email.com"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition duration-200"
            />
        </div>


        {/* Change Password Link/Button */}
        

        {/* Submission Button */}
        <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 mt-8 bg-lime-500 text-gray-900 font-extrabold py-3 px-4 rounded-lg hover:bg-lime-400 transition duration-300 transform hover:scale-[1.01] shadow-lg shadow-lime-900/50"
        >
            <span>Save Changes</span>
        </button>

        {/* Success/Error Message Placeholder */}
        <p className="text-center text-sm font-semibold text-lime-400">
            {/* Success: Profile updated successfully! */}
        </p>
    </form>
</div>
</div>

    </>
  )
}
