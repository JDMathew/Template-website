import React from "react";
import Header from "./../components/Header";

const HomepageLayout = (props) => {
  return (
    <div className="HomepageLayout">
      <Header />
      {props.children}
    </div>
  );
};

export default HomepageLayout;
