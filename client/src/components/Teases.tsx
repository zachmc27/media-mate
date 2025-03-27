import "../styles/Teases.css"


//uncomment when implementing tab logic
// import Quiztease from "./QuizTease"
// import Discovertease from "./Discovertease"
import Listtease from "./Listtease"

export default function Teases() {
  return (
    <div className="teases-box">
        <div className="tabs">
            <h1>Quiz</h1>
            <h1>Discover</h1>
            <h1>My Lists</h1>
        </div>
        {/* <Quiztease /> */}
        {/* <Discovertease /> */}
        <Listtease />
    </div>
  )
}
