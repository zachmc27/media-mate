import "../App.css";
import "../styles/Discover.css";
import MovieCard from "../components/SeenItCard";

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
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                </div>
            </div>

            <div className="list-container">
                <p>For You</p>
                <div className="movies-container">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                </div>
            </div>
        </div>




    )

}