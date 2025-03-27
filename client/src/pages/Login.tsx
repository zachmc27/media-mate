import { useState, FormEvent, ChangeEvent } from "react";
import "../App.css";
import "../styles/Form.css";
import chicken from "../assets/strangerthings.jpg"
import Auth from '../utils/auth';  
import { login } from "../api/authAPI";  
import { UserLogin } from "../interfaces/UserLogin"; 

const Login = () => {
  // State to manage the login form data
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the login API endpoint with loginData
      const data = await login(loginData);
      // If login is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
    }
  };

  return (
    <div className='form-container'>
      <div>
      <img src={chicken} alt="Chicken" />
      </div>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {/* Username input field */}
        <div className="form-group">
          {/* <label>Username</label> */}
          <input 
            className="form-input"
            type='text'
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
            placeholder="email"
          />
        </div>
        {/* Password input field */}
        <div className="form-group">
          {/* <label>Password</label> */}
          <input 
            className="form-input"
            type='password'
            name='password'
            value={loginData.password || ''}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
  
        <div className="form-group">
          <button className="form-button " type='submit'>Log In</button>
        </div>
        <div >
        <p>Don't have an account? <a href='#'>Sign up now.</a></p>
        </div>
      </form>

      <div>
      <img src={chicken} alt="Chicken" />
      </div>
    </div>
  )
};

export default Login;
