import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Maps from './Components/Map/Maps'
import Userinfo from './Components/UserInfo/UserInfo'
import { SignupForm, LoginForm } from './Components/Auth/SignUp'

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Maps />
          <Link to='/' />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/userinfo" element={<Userinfo />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
