import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import Signup from './components/Signup'
import Login from './components/Login'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import { ProfileManage } from './components/ProfileManage'
import { Header } from './components/Header'
import { PrivateRouting } from './components/PrivateRouting'
import { ForgotPass } from './components/ForgotPass'
import { ResetPass } from './components/ResetPass'
import VaultViewPage from './components/VaultViewPage'
import AddNewVault from './components/AddNewVault'
import EditVault from './components/EditVault'
function App() {

axios.defaults.baseURL = 'http://localhost:3000';

  return (
    <>
        <Routes>
          <Route path='/' element={<HeroSection/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/resetpass' element={<ResetPass/>}/>
          <Route path='/forgotpass' element={<ForgotPass/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='' element={<PrivateRouting/>}>
            <Route path='/view' element={<Header/>}>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='profile/:id' element={<ProfileManage/>}/>
              <Route path='vaultview/:vid' element={<VaultViewPage/>} />
              <Route path='vaultadd' element={<AddNewVault/>}/>
              <Route path='vaultedit/:vid' element={<EditVault/>} />
            </Route>
          </Route>
          
        </Routes>
    </>
  )
}

export default App
