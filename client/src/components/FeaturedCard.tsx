import "../styles/FeaturedCard.css"
import ReactPlayer from "react-player"

export default function FeaturedCard() {
    const url = 'https://www.youtube.com/watch?v=u8ccGjar4Es'

  return (
    <div className="featured-box">
      <div className="label-box">
      <h1 className="label">Featured</h1>
      </div>
      <div className="video">
        <ReactPlayer 
         url={url}
         playing
         muted
         controls={true}
         width="100%"
         height="100%"
 
         ></ReactPlayer>
      </div>
      <div className="info">
        <h2>Title</h2>
        <p>2020</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing 
            elit. Quibusdam, repellendus.</p>
        <p>starring metal kermit</p>
      </div>
    </div>
  )
}
