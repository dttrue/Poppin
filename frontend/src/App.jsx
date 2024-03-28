import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Maps from './Components/Map/Maps'

function App() {

  return (
    <>
      <div>
        <Router>
          <Header />
          <Maps />
          <Link to='/' />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
