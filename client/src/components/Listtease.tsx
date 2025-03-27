import "../styles/Listtease.css"
import chicken from "../assets/strangerthings.jpg"

export default function Listtease() {
  return (
    <div className="cards-row">
    <div className="list-section">
        <div className="list-title">Brett & Misha</div>   
        <div className="list-1">
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
        </div>
    </div>

    <div className="vert-rule"></div>

    <div className="list-section">
        <div className="list-title">Watch Later</div>   
        <div className="list-2">
            <div className="card">
                <img src={chicken} alt="Chicken" />
                <p className="card-title">Chicken Quiz</p>
            </div>
            <div className="card">
                <img src={chicken} alt="Chicken" />
                <p className="card-title">Chicken Quiz</p>
            </div>
        </div>
    </div>
    <div className="explore">
      <h3>Explore more...</h3>
    </div>
  </div>
  )
}
