import { useState } from 'react'
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

function App() {
  

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
