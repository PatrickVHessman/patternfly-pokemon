import React from "react";

const Detail = (props) => {
  return (
    <div>
      <strong>{props.label}:</strong> {props.value}
    </div>
  );
};

export default Detail;
