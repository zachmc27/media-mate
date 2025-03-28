import "../styles/Flickpicks.css"
import chicken from "../assets/chicken.jpg"

export default function Flickpicks() {
  return (
    <div className="flickpicks">
        <p className="info-blurb">Flickpicks are short surveys that give you a list of movies and shows
            that you decide whether or not you want to watch. Swipe up for yes and down for no. 
            After completing a flickpick, compare it with a friends flickpick to get a matched list of 
            shared answers! </p>
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
            </div>
        </div>
    </div>
  )
}
