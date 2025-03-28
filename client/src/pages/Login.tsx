import "../App.css";
import "../styles/Form.css"; // Importing the CSS file for styling the form
import Form from "../components/Form"; // Importing the Form component for login functionality
import chicken from "../assets/strangerthings.jpg"


export default function Login() {

  return (
    <div className='form-container'>
      <div>
      <img src={chicken} alt="Chicken" />
      </div>
      <Form /> {/* Render the LoginForm component here */}
      <div>
      <img src={chicken} alt="Chicken" />
      </div>
    </div>
  )
};

