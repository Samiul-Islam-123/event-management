import React from 'react'
import Hero from '../../components/Hero'
import Info from '../../components/Info'
import InfoSecond from '../../components/InfoSecond'
import Events from '../../components/Events'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Info />
      <InfoSecond />
      <Events />
      <Footer />
    </>
  )
}

export default LandingPage