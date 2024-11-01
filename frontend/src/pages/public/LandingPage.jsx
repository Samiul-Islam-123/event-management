import React from 'react'
import Hero from '../../components/Hero'
import Info from '../../components/Info'
import InfoSecond from '../../components/InfoSecond'
import Events from '../../components/Events'
import Nav from '../../components/Nav'

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Info />
      <InfoSecond />
      <Events />
    </>
  )
}

export default LandingPage