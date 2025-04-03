import "../App.css";
import "../styles/Form.css"; // Importing the CSS file for styling the form
import Form from "../components/Form"; // Importing the Form component for login functionality
import "../styles/LoginAnim.css"
import { motion } from "framer-motion";


export default function Login() {

  return (
    <>
    <div className="anim-box">
    <div className="right-side">
    <motion.div className="bxr1"
    animate= {{
      width: "50%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    }}
    ></motion.div>
    <motion.div className="bxr2"
    animate= {{
      width: "55%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .2
    }}></motion.div>
    <motion.div className="bxr3"
    animate= {{
      width: "40%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .4
    }}></motion.div>
    <motion.div className="bxr4"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .6
    }}></motion.div>
    <motion.div className="bxr5"
    animate= {{
      width: "10%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .8
    }}></motion.div>
    <motion.div className="bxr6"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1
    }}></motion.div>
    <motion.div className="bxr7"
    animate= {{
      width: "30%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.2
    }}></motion.div>
    <motion.div className="bxr8"
    animate= {{
      width: "40%" 
    }}
    transition={{
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.4
    }}></motion.div>
    <motion.div className="bxr9"
    animate= {{
      width: "55%" 
    }}
    transition={{
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.6
    }}></motion.div>
    <motion.div className="bxr10"
    animate= {{
      width: "50%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.8
    }}></motion.div>
  </div>
    <div className='form-container'>
      <Form /> {/* Render the LoginForm component here */}
    </div>
    <div className="left-side">
    <motion.div className="bxl1"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .1
    }}></motion.div>
    <motion.div className="bxl2"
    animate= {{
      width: "25%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .3
    }}></motion.div>
    <motion.div className="bxl3"
    animate= {{
      width: "30%" 
    }}
    transition={{
      duration: 10,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .5
    }}></motion.div>
    <motion.div className="bxl4"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .7
    }}></motion.div>
    <motion.div className="bxl5"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: .9
    }}></motion.div>
    <motion.div className="bxl6"
    animate= {{
      width: "25%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.1
    }}></motion.div>
    <motion.div className="bxl7"
    animate= {{
      width: "35%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.3
    }}></motion.div>
    <motion.div className="bxl8"
    animate= {{
      width: "30%" 
    }}
    transition={{
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.5
    }}></motion.div>
    <motion.div className="bxl9"
    animate= {{
      width: "20%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.7
    }}></motion.div>
    <motion.div className="bxl10"
    animate= {{
      width: "30%" 
    }}
    transition={{
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
      delay: 1.9
    }}></motion.div>
    </div>
    </div>
    </>

  )
};

