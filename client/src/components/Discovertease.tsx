import "../styles/Discovertease.css"
import chicken from "../assets/strangerthings.jpg"

export default function Discovertease() {
  return (
    <div className="cards-row">
    <div className="card">
      <img src={chicken} alt="Chicken" />
      <p className="card-title">Chicken Quiz</p>
    </div>
    <div className="card">
      <img src={chicken} alt="Chicken" />
      <p className="card-title">Chicken Quiz</p>
    </div>
    <div className="card">
      <img src={chicken} alt="Chicken" />
      <p className="card-title">Chicken Quiz</p>
    </div>
    <div className="card">
      <img src={chicken} alt="Chicken" />
      <p className="card-title">Chicken Quiz</p>
    </div><div className="explore">
      <h3>Explore more...</h3>
    </div>
  </div>
  )
}
