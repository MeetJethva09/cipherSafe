import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Bounce, toast , ToastContainer} from 'react-toastify'

export const OtpCheck = () => {
    const navigate = useNavigate();
    const {register , handleSubmit} = useForm({})

    const submitHandler = async (data) =>{
        try{
            const res = await axios.post('/user/otpverify' , data , {withCredentials : true});
        console.log(res);
            toast.success('Otp verified!!', {
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
                    navigate('/resetpass')
                },2000)
            }
        catch(err)
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

  return (
    <div>
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
        Otp Verification
    </h3>
    
  
    <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
    
       
        <div>
            <label htmlFor="edit-username" className="block text-sm font-medium text-gray-400 mb-2">
                Enter OTP : 
            </label>
            <input
                type="number"
                name="otp"
                required
                {...register('otp')}
                placeholder="Enter Otp.."
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition duration-200"
            />
        </div>

        <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 mt-8 bg-lime-500 text-gray-900 font-extrabold py-3 px-4 rounded-lg hover:bg-lime-400 transition duration-300 transform hover:scale-[1.01] shadow-lg shadow-lime-900/50"
        >
            <span>Verify Otp</span>
        </button>

        {/* Success/Error Message Placeholder */}
        <p className="text-center text-sm font-semibold text-lime-400">
            {/* Success: Profile updated successfully! */}
        </p>
    </form>
</div>
</div>

    </div>
  )
}
