import React from "react";

import Artist from "./../../assets/Artist.jpg";
import ArtEnthusiast from "./../../assets/ArtEnthusiast.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="Directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${Artist})` }}>
          <a>Artist</a>
        </div>
        <div
          className="item"
          style={{ backgroundImage: `url(${ArtEnthusiast})` }}
        >
          <a>Art Enthusiast</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
