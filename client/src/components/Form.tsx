import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';  
import { login, register } from "../api/authAPI";  
import { UserLogin } from "../interfaces/UserLogin"; 
import pic from "../assets/profileIcon_01.png";
import NotifyModal from "../components/NotifyModal";

const Form = () => {
    const [showForm, setShowForm] = useState('login');
    

    return (
        <div>
            {/* Conditionally render the forms */}
            {showForm === 'login' && <LoginForm setShowForm={setShowForm} />}
            {showForm === 'signup' && <SignupForm setShowForm={setShowForm} />}
        </div>
    );
}

/***************  LOG IN FORM  ****************/
function LoginForm({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<string>> }) {
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
      Auth.login(data.token, data.userId);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during login
      alert( 'Login failed'); // Show an alert with the error message
    }
  };

  return(
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
            placeholder="username"
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
        <p>Don't have an account? <a href="#" onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        setShowForm('signup'); // Switch to the signup form
                    }}>
                        Sign up now.
                    </a>
                    </p>
        </div>
      </form>

     )
}

/***************  SIGN UP FORM  ****************/

function SignupForm({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<string>> }) {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    icon: pic,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setPassword(e.target.value);
    setPasswordError(''); // Clear error when password changes
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
   handleChange(e);
   setConfirmPassword(e.target.value);
   setPasswordError(''); // Clear error when confirm password changes
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    return true;
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  // close modal and change to login page
  const closeModal = () => {
    setIsModalOpen(false);
    setShowForm("login");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validatePassword()) {
      // Proceed with form submission
    
    try {
      const data = await register(signUpData); // Call the register function from authAPI
      console.log("User registered successfully:", data);
       // Switch to login form after successful registration

      setIsModalOpen(true);
    } catch (err) {
      console.error("Error during registration:", err);
      alert("An error occured during registration"); // Show error message to the user
    }
  } else {
    alert(passwordError);
  }
  };

  return (
            <form className='form signup-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <input 
                        className="form-input"
                        type='text'
                        name='name'
                        onChange={handleChange}
                        placeholder="name"
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-input"
                        type='text'
                        name='email'
                        onChange={handleChange}
                        placeholder="email"
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-input"
                        type='text'
                        name='username'
                        onChange={handleChange}
                        placeholder="username"
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-input"
                        type='password'
                        name='password'
                        onChange={handlePasswordChange}
                        placeholder="password"
                    />
                </div>
                <div className="form-group">
                    <input 
                        className="form-input"
                        type='password'
                        name='passwordConfirm'
                        onChange={handleConfirmPasswordChange}
                        placeholder="re-enter password"
                    />
                </div> 

                { isModalOpen && (
                  <NotifyModal cancel={closeModal}>
                      <p>{`${signUpData.username}'s account has been made!`}</p>
                  </NotifyModal>
                  )
                            
                }

                <div className="form-group">
                    <button className="form-button" type='submit'>Sign Up</button>
                </div>
                <div>
                    <p>
                        Already have an account?{' '}
                        <a href="#" onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            setShowForm('login'); // Switch to the login form
                        }}>
                            Log in now.
                        </a>
                    </p>
                </div>
            </form>
        );
    }
export default Form;