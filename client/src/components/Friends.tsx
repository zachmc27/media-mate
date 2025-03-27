import "../styles/Friends.css"
import Friendlist from "./Friendlist"
// import { fetchFriends, sendFriendRequest, fetchPendingFriends, acceptFriendRequest, rejectFriendRequest } from "../api/friendAPI";

export default function Friends() {
  return (
    <div className="list-box">
        <div className="add-friend">
          <input type="text" placeholder="Friend code ..."/>
          <button type="submit"> Send Request</button>
        </div>
        <Friendlist />
    </div>
  )
}
