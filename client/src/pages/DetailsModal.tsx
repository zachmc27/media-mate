// import React from "react";
import "../styles/details.css";

const Modal = () => {
  return (
    <div className="backdrop">
      <div className="details">
        <img src="./coming_soon.png" alt="coming soon" />
        <p className="exit">X</p>
        <div>
          <h1>Title</h1>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            voluptatum sapiente. Aliquam explicabo aut nemo eveniet totam!
            Tempora porro dolor debitis mollitia maxime nulla ea, quia, ipsum
            beatae, ratione rem?
          </p>
        </div>
        <div className="footer">
          <div className="directorAndActors">
            <div />
            <p>Director, Actor, Actor</p>
          </div>
          <button className="addButton">Add to List</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
