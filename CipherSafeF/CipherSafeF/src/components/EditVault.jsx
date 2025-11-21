import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditVault = () => {
    const navigate = useNavigate()
    const vid = useParams().vid;

    const {register , handleSubmit} = useForm({
        defaultValues : async () =>{
            const res = await axios.get('/vault/vaultbyvid/'+vid);
            return res.data.data;
        }
    });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 p-8 flex justify-center items-start">
      
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">
        
        {/* Back Button */}
        <button onClick={()=>navigate(-1)}
          className="mb-6 bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          ⬅ Back
        </button>

        <h1 className="text-4xl font-extrabold text-white mb-2">Edit Vault</h1>
        <p className="text-gray-400 mb-10">
          Update your stored credentials securely.
        </p>

        {/* Edit Vault Form */}
        <form className="space-y-6">

          {/* Vault Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Vault Name</label>
            <input
              type="text"
              placeholder="e.g. Facebook Login"
              {...register('vaultName')}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-lime-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Category</label>
            <select
            {...register('category')}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-lime-500"
            >
              <option>Social</option>
              <option>Work</option>
              <option>Finance</option>
              <option>Shopping</option>
            </select>
          </div>

          {/* Username / Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Username / Email</label>
            <input
              type="text"
              {...register('username')}
              placeholder="youremail@example.com"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••••"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Notes (Optional)</label>
            <textarea
            {...register('notes')}
              rows="4"
              placeholder="Enter additional details..."
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-lime-500 text-gray-900 font-extrabold py-3 rounded-lg hover:bg-lime-400 transition duration-300 shadow-lg"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditVault;
