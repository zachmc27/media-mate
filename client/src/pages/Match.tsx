import "../App.css";
import "../styles/Match.css";
import MatchCard from "../components/MatchCard";
import useAuthRedirect from "../utils/useAuthRedirect";

export default function Home() {
  useAuthRedirect();
  return (
    <div className="section match-container">
        <MatchCard />
    </div>
  )
}