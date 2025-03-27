import "../styles/Navbar.css"

// uncomment once implementing friendlist logic
// import Friends from "./Friends"

//visual assets
import house from "../assets/house.svg"
import heart from "../assets/heart.svg"
import film from "../assets/film.svg"
import user from "../assets/user.svg"
import users from "../assets/users.svg"


const Navbar = () => {

    

  return (

    <div className="navbar">
      <div className="logo">Cinematch</div>
      <div className="tabs-box">
        <div className="tab">
          <img src={house} alt="home icon" />
          <p>Home</p>
        </div>
        <div className="tab">
          <img src={heart} alt="heart icon" />
          <p>Quizzes</p>
        </div>
        <div className="tab">
          <img src={film} alt="reel icon" />
          <p>Discover</p>
        </div>
        <div className="tab">
          <img src={users} alt="people icon" />
          <p>Friends</p>
        </div>
        <div className="tab">
          <img src={user} alt="person icon" />
          <p>Profile</p>
        </div>
      </div>
    </div>
    
 
  )
}

export default Navbar;
