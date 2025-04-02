import "../App.css"
import "../styles/Home.css"
import FeaturedCard from "../components/FeaturedCard"
import Teases from "../components/Teases"
import useAuthRedirect from "../utils/useAuthRedirect";

export default function Home() {
  useAuthRedirect();
  return (
    <div className="home">
        <FeaturedCard />
        <Teases />
    </div>
  )
}