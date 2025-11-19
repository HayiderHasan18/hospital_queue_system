import React from 'react'
 import './index.css'
import About from './About'
import Features from './Features'
import AboutCompany from './AboutCompany'
import Header from './Header'
import Contact from "./Contact"
import Footer from './Footer'
import Hero from './Hero'
import Benefits from './Benefits'
function LandingPage() {
  return (
	<div>
		  <Header />
		   <Hero /> 
		  <Features />
		  <Benefits />
		  <About />
		  <AboutCompany />
		  <Contact />
		  <Footer/>
	</div>
  )
}

export default LandingPage
