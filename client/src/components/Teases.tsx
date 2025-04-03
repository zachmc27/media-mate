import { useState } from "react"
import "../styles/Teases.css"


//uncomment when implementing tab logic
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
            <h1 onClick={handleFlickClick} className={isFlickTabOpen ? "selected tease-title work-sans" : 'tease-title work-sans'}>FLICKPICK</h1>
            <h1 onClick={handleDiscoverClick} className={isDiscoverTabOpen ? "selected tease-title work-sans" : 'tease-title work-sans'}>DISCOVER</h1>
            <h1 onClick={handleListClick} className={isListTabOpen ? 'selected tease-title work-sans' : 'tease-title work-sans'}>MY LISTS</h1>
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
