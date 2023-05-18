import React from "react";

const ActionMain = ({ Title, Text }) => {
  return (
    <div className="Main mx-n4 mt-n4 w-100">
      <div className="d-flex  justify-content-between align-items-center">
        <div>
          <h1>{Title}</h1>
          <p>{Text}</p>
        </div>
        <div className="d-flex gap-3">
          <i class="ri-star-line" style={{ color: "white" }}></i>
          <i class="ri-share-fill" style={{ color: "white" }}></i>
          <i class="ri-flag-line" style={{ color: "white" }}></i>
        </div>
      </div>
    </div>
  );
};

export default ActionMain;
