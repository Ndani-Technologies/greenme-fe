import React from "react";
import discussionBG from "../../assets/images/Discussion-BG.png";

const DiscussionMain = ({ title, text }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between mx-n2 mt-n4 w-100"
      style={{
        backgroundImage: `url(${discussionBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "115px 20px 0 65px",
      }}
    >
      <div>
        <h1 className="text-white mb-5">{title}</h1>
        <h5 className="text-white mb-4">{text}</h5>
      </div>
      <div className="d-flex gap-3">
        <i className="ri-star-line" style={{ color: "white" }}></i>
        <i className="ri-share-fill" style={{ color: "white" }}></i>
        <i className="ri-flag-line" style={{ color: "white" }}></i>
      </div>
    </div>
  );
};

export default DiscussionMain;
