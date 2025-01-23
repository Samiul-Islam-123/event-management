import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Info from './components/Info'
import InfoSecond from './components/InfoSecond'
import Events from './components/Events'
import LandingPage from './pages/public/LandingPage'
import RoutesManager from './RoutesManager'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { useData } from './context/DataContext'

function App() {

  const {user} = useUser();
  const {setIsOrganizer} = useData();
  const CheckOrganizer = async() => {
    try{
      if(!user)
      {
        setIsOrganizer(false)
      }

      else{

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`);
        if(response.data.success === true){
          setIsOrganizer((response.data.isOrganizer))
        }
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    CheckOrganizer()
  },[])

  return (
    <>
      <div className='main w-full overflow-clip'>
        
        {/* <Hero />
        <Info />
        <InfoSecond />
        <Events /> */}
        <RoutesManager />
      </div>
    </>
  )
}

export default App
