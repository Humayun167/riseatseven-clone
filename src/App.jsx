
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PageReveal from './components/PageReveal'

import './App.css'
import LogoCloud from './components/LogoCloud'
import AboutPreview from './components/AboutPreview'
import FeaturedWork from './components/FeaturedWork'
import OurServices from './components/OurServices'
import ScrollingHero from './components/ScrollingHero'
import ShowcaseCard from './components/ShowcaseCard'
import WhatsNew from './components/WhatsNew'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <PageReveal />
      <Navbar />
      <Hero />
      <LogoCloud/>
      <AboutPreview/>
      <FeaturedWork/>
      <OurServices/>
      <ScrollingHero/>
      <ShowcaseCard/>
        <WhatsNew/>
        <CTASection/>
        <Footer/>
    </>
  )
}

export default App
