import "../styles/MatchCard.css";
import chicken from "../assets/strangerthings.jpg"

export default function MatchCard() {

  return (
    <div className="card">
  <img src={chicken} alt="Chicken" />
  <div className="card-container">
    <b className="card-title work-sans">John Doe</b>
    <i className="card-year">1975</i>
    <p className="card-summary"> &emsp;We love that guy WOOOOW hes amazing awesome slay yas okayyyyyy slayyy yes awesome cool super neat</p>
    <a href="#" >See More </a>
  </div>
</div>
  )
}