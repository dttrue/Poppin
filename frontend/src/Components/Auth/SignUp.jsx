import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import userHelpers from '../../Helpers/userHelpers';

// password validation function
const isPasswordValid = (password) => {
  // regex patterns for password requirements
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

  // check if password meets all requirements
  return (
    uppercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password)
  );
};

// component for login form
const LoginForm = () => {
  // state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // get the login function from AuthContext
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      await login(email, password); // try to login using provided email and password
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form style={{ margin: '40px' }} onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Link to="/signup"><strong>Don't have an account?</strong></Link>

      <button type="submit">Login</button>
    </form>
  );
};

// component for signup form
const SignupForm = () => {
  // state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state variables for personal information
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [street_address_1, setStreetAddress1] = useState('');
  const [street_address_2, setStreetAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZipCode] = useState('');
  // get the signup function from AuthContext
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  // function to handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    // check if password meets requirements
    if (!isPasswordValid(password)) {
      alert(
        'Password requires at least one uppercase letter, one number, and one special character.'
      );
      return;
    }

    // create user in database
    try {
      await userHelpers.create({
        first_name,
        last_name,
        date_of_birth: new Date(date_of_birth).toISOString(),
        email,
        street_address_1,
        street_address_2,
        city,
        state,
        zip_code,
      });
    } catch (error) {
      console.error(error);
    }

    // proceed with signup if password is valid
    try {
      await signup(email, password); // try to signup using provided email and password
      console.log('Signup successful');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form style={{ margin: '40px' }}onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={date_of_birth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Street Address:</label>
          <input
            type="text"
            value={street_address_1}
            onChange={(e) => setStreetAddress1(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Street Address 2:</label>
          <input
            type="text"
            value={street_address_2}
            onChange={(e) => setStreetAddress2(e.target.value)}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            value={zip_code}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export { LoginForm, SignupForm };