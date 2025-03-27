import "../App.css";
import "../styles/Profile.css";
import chicken from "../assets/chicken.jpg"
import MovieCard from "../components/MovieCard";

export default function Profile() {
  return (
    <div className="profile-container">
        <div className="profile-user">
            <img src={chicken} alt="Chicken" />
            <b>First Last</b> 
            <p>username</p>
            <ul>
                <li><a href="#">Collab List</a></li>
                <li><a href="#">Watch Later</a></li>
                <li><a href="#">Seen It</a></li>
            </ul>
            <button>Log Out</button>
        </div>
        <div className="profile-list-container">
            <div className="list-container">
            <p>Brett + Misha</p>
            <div className="movies-container">
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
            <p>Brett + Zach</p>
            <div className="movies-container">
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
    </div>

    
  )
}