import "../App.css"
import "../styles/Home.css"
import FeaturedCard from "../components/FeaturedCard"
import Teases from "../components/Teases"

export default function Home() {
  return (
    <div className="section home">
        <FeaturedCard />
        <Teases />
    </div>
  )
}
