import "../App.css";
import "../styles/Discover.css";
import MatchCard from "../components/MatchCard";

export default function Discover() {


    return(
        <div className="discover-container">
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="search for movies..."
                />
                <button className="search-button">Search</button>
            </div>
            <div className="list-container">
                <p>Popular Now</p>
                <div className="movies-container">
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                </div>
            </div>

            <div className="list-container">
                <p>For You</p>
                <div className="movies-container">
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                <MatchCard />
                </div>
            </div>
        </div>




    )

}