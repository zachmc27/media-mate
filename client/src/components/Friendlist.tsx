import user from "../assets/user.svg"
import "../styles/Friendlist.css"

export default function Friendlist() {
  return (
    <div className="friendlist">
        <div className="friend">
            <img src={user} alt="" />
            <p>Brett</p>
            <div className="buttons">
            <button>Match</button>
            <button>Delete</button>
            </div>
        </div>
        <div className="friend">
            <img src={user} alt="" />
            <p>Misha</p>
        </div>
        <div className="friend">
            <img src={user} alt="" />
            <p>Sammi</p>
        </div>
        <div className="friend">
            <img src={user} alt="" />
            <p>Kendrick</p>
        </div>
    </div>
  )
}
