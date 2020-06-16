import React from "react";

import "./styles.scss";

const FormInput = ({ handleChange, label, ...otherProops }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}

      <input className="formInput" onChange={handleChange} {...otherProops} />
    </div>
  );
};

export default FormInput;
