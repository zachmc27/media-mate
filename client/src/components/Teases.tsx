import { useState } from "react"
import "../styles/Teases.css"

import Flicktease from "./Flicktease"
import Discovertease from "./Discovertease"
import Listtease from "./Listtease"

export default function Teases() {
  const [isFlickTabOpen, setIsFlickTabOpen] = useState(false);
  const [isDiscoverTabOpen, setIsDiscoverTabOpen] = useState(false);
  const [isListTabOpen, setIsListTabOpen] = useState(true);

  const handleFlickClick = () => {
    setIsFlickTabOpen(true);
    setIsDiscoverTabOpen(false);
    setIsListTabOpen(false);
  }

  const handleDiscoverClick = () => {
    setIsDiscoverTabOpen(true);
    setIsFlickTabOpen(false);
    setIsListTabOpen(false)
  }

  const handleListClick = () => {
    setIsListTabOpen(true);
    setIsDiscoverTabOpen(false);
    setIsFlickTabOpen(false);
  }

 


  return (
    <div className="teases-box">
        <div className="tabs">
            <h1 onClick={handleFlickClick} className={isFlickTabOpen ? "selected tease-title" : 'tease-title'}>Flickpick</h1>
            <h1 onClick={handleDiscoverClick} className={isDiscoverTabOpen ? "selected tease-title" : 'tease-title'}>Discover</h1>
            <h1 onClick={handleListClick} className={isListTabOpen ? 'selected tease-title' : 'tease-title'}>My Lists</h1>
        </div>
        {
          isFlickTabOpen && <Flicktease />
        }
        {
          isDiscoverTabOpen && <Discovertease />
        }
        {
          isListTabOpen && <Listtease />
        }
        
        
    </div>
  )
}
