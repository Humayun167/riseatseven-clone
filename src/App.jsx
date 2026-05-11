
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PageReveal from './components/PageReveal'

import './App.css'
import LogoCloud from './components/LogoCloud'
import AboutPreview from './components/AboutPreview'
import FeaturedWork from './components/FeaturedWork'

function App() {
  return (
    <>
      <PageReveal />
      <Navbar />
      <Hero />
      <LogoCloud/>
      <AboutPreview/>
      <FeaturedWork/>
    </>
  )
}

export default App
