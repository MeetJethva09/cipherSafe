import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer , Bounce ,toast} from "react-toastify";

const AddNewVault = () => {
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm({})

  const submitHandler = async (data) =>{
      let userId = localStorage.getItem('id');
      data.userId = userId;
      try{
        const res = await axios.post('/vault/addvault' , data);
        toast.success('Vault Added..', {
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
              toast.warning('Something went wrong..', {
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


    <div className="min-h-screen bg-gray-950 text-gray-50 p-8 flex justify-center items-start">

      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          ⬅ Back
        </button>

        <h1 className="text-4xl font-extrabold text-white mb-2">Add New Vault</h1>
        <p className="text-gray-400 mb-10">
          Store your login credentials securely inside your encrypted vault.
        </p>

        {/* Form UI */}
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>

          {/* Vault Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Vault Name</label>
            <input
              type="text"
              placeholder="e.g. Facebook Login"
              {...register('vaultName')}
              required
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select 
               name="category"
               required
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-lime-500"
              {...register('category')}
           
            >  
              <option disabled  >------select-------</option>
              <option value='Social'>Social</option>
              <option value='Work'>Work</option>
      
            </select>
          </div>

          {/* Username / Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Username / Email</label>
            <input
              type="text"
              required
              {...register('username')}
              placeholder="e.g. youremail@example.com"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••"
              {...register('password')}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Notes (Optional)</label>
            <textarea
              rows="4"
              {...register('notes')}
              required
              placeholder="Any additional information..."
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 font-extrabold py-3 rounded-lg hover:bg-lime-400 transition duration-300 shadow-lg"
          >
            Add Vault
          </button>

        </form>
      </div>
    </div>
    </>
  );
};

export default AddNewVault;
