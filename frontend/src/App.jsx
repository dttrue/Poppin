import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Userinfo from './Components/UserInfo/UserInfo';
import { SignupForm, LoginForm } from './Components/Auth/SignUp';
import EventsForm from './Components/EventsForm/EventsForm';
import EventsList from './Components/EventsList/EventsList';



export default function App() {
  const handleSave = (eventData) => {
    console.log(eventData);
  };

  return (
    // <Router>
    //   <Header />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signup" element={<SignupForm />} />
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/users" element={<Userinfo />} />
      
    //   </Routes>
    // </Router>
<div>
<EventsForm onSave={handleSave} />
    <EventsList />
</div>



    
  );
}

