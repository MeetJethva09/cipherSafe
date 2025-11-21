// src/pages/VaultViewPage.jsx

import axios from "axios";
import React, { useEffect , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const VaultViewPage = () => {
    const navigate = useNavigate()
    const vid = useParams().vid;
    const [vault , setVault] = useState({});

    const getVaultVaultById = async () =>{
        const res = await axios.get('/vault/vaultbyvid/' + vid);
        setVault(res.data.data);
    }
    const utcDate = new Date(vault.updatedAt).toLocaleDateString("en-IN",{
      timeZone : "Asia/Kolkata"
    })

useEffect(()=>{
    getVaultVaultById()
},[])

  return (

    <div className="min-h-screen bg-gray-950 text-gray-50 flex flex-col items-center p-6">
      
      {/* Card Container */}
      <div className="bg-gray-900 w-full max-w-2xl p-8 rounded-2xl shadow-xl border border-gray-800">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-lime-400 mb-6">
          🔐 {vault?.vaultName}
        </h1>

        {/* Vault Details */}
        <div className="space-y-6">

          <div>
            <p className="text-gray-400 text-sm">Category</p>
            <p className="text-xl font-semibold">{vault?.category}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Username / Email</p>
            <p className="text-xl text-cyan-300">{vault?.username}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Password</p>
            <p className="bg-gray-800 p-3 rounded-lg font-mono tracking-wider text-lg">
              {vault?.password}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Notes</p>
            <p className="bg-gray-800 p-3 rounded-lg font-mono tracking-wider text-lg">
              {vault?.notes}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-gray-300">{utcDate}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <button onClick={()=> navigate(-1)} className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600">
            ⬅ Back
          </button>

          <button className="bg-lime-500 text-gray-900 px-5 py-2 rounded-lg font-bold hover:bg-lime-400">
            <Link to={`/view/vaultedit/${vault._id}`}>
                ✏ Edit Vault
            </Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default VaultViewPage;
