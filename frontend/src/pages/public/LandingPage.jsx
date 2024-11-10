import React from 'react'
import Hero from '../../components/Hero'
import Info from '../../components/Info'
import InfoSecond from '../../components/InfoSecond'
import Events from '../../components/Events'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Marquee from '../../components/Marquee'

function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Info />
      <Marquee />
      <InfoSecond />
      <Events />
      <Footer />
    </>
  )
}

export default LandingPage