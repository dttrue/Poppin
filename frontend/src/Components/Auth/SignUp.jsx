import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

// component for login form
const LoginForm = () => {
  // state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // get the login function from AuthContext
  const { login } = useContext(AuthContext);

  // function to handle login submission
  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      await login(email, password); // try to login using provided email and password
      console.log('Login successful');
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
  // get the signup function from AuthContext
  const { signup } = useContext(AuthContext);

  // function to handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password) // try to signup using provided email and password
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export { LoginForm, SignupForm };