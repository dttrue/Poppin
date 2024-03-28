import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import { SignupForm, LoginForm } from './Components/Auth/SignUp'

function App() {

  return (
    <>
      <div>
        <Router>
          <Header />

          <Link to='/' className="home-button">Home</Link>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
