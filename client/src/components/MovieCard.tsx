import "../styles/MatchCard.css";
import chicken from "../assets/strangerthings.jpg"

export default function MovieCard() {

  return (
    <div className="card">
  <img src={chicken} alt="Chicken" />
  <div className="card-container">
    <b className="card-title">John Doe</b>
    <i className="card-year">1975</i>
  </div>
</div>
  )
}