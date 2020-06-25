import React from "react";

import Student from "./../../assets/Student.jpg";
import Teacher from "./../../assets/Teacher.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="Directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${Student})` }}>
          <a>Student</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${Teacher})` }}>
          <a>Teacher</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
