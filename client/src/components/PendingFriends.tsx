import { useState } from "react"
import "../styles/PendingFriends.css"
import RenderedPendingList from "./RenderedPendingList"

export default function PendingFriends() {

  const [isOpen, setIsOpen] = useState(false)

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }
  
  return (
    <div className="pending-container">
    <button className="pending-dropdown poppins p-dark" onClick={handleIsOpen}>Pending Friends</button>
    {
      isOpen && <RenderedPendingList />
    }
    </div>
  )
}
