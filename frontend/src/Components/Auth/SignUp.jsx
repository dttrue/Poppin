import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      await login(email, password);
      console.log('Login successful');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Username/Email:</label>
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
      <button type="submit">Login</button>
    </form>
  );
};

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password)
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <div>
        <label>Username/Email:</label>
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