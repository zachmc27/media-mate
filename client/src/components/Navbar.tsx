import { Link, useLocation } from "react-router-dom";

// uncomment once implementing friendlist logic
import Friends from "./Friends"

//visual assets
import "../styles/Navbar.css"
import house from "../assets/house.svg"
import heart from "../assets/heart.svg"
import film from "../assets/film.svg"
import user from "../assets/user.svg"
import users from "../assets/users.svg"
import { useState } from "react";


const Navbar = () => {

  const [friendActive, setFriendsActive] = useState(false)
  const location = useLocation();

  function handleFriendsActive() {
    setFriendsActive(!friendActive)
  }

  return (
    <>
    <div className="navbar">
      <div className="logo">Cinematch</div>
      <div className="tabs-box">
        <Link to="/" className={location.pathname === '/' ? "tab selected" : "tab"}>
          <img src={house} alt="home icon" />
          <div>Home</div>
        </Link>
        <Link to="/flickpicks" className={location.pathname === '/flickpicks' ? "tab selected" : "tab"}>
          <img src={heart} alt="heart icon" />
          <div>Flickpicks</div>
        </Link>
        <Link to="/discover" className={location.pathname === '/discover' ? "tab selected" : "tab"}>
          <img src={film} alt="reel icon" />
          <div>Discover</div>
        </Link>
        <button className={friendActive ? "tab selected remove-btn-styling" : "tab remove-btn-styling"} onClick={handleFriendsActive}>
          <img src={users} alt="people icon" />
          <div onClick={handleFriendsActive}>Friends</div>
        </button>
        <Link to="/profile" className={location.pathname === '/profile' ? "tab selected" : "tab"}>
          <img src={user} alt="person icon" />
          <div>Profile</div>
        </Link>
      </div>
    </div>
    {friendActive && <Friends />}
    </>
  )
}

export default Navbar;
