import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'

function App() {

  return (
    <>
      <div>
        <Router>
          <Header />
          
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
