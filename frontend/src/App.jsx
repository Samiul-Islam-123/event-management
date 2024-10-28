import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Info from './components/Info'
import InfoSecond from './components/InfoSecond'
import Events from './components/Events'

function App() {
  

  return (
    <>
      <div className='main w-full overflow-clip'>
        <Nav />
        <Hero />
        <Info />
        <InfoSecond />
        <Events />
      </div>
    </>
  )
}

export default App
