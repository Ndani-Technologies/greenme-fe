import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Col } from "reactstrap";

const StarsRating = ({ Title, Rating, validation, value }) => {
  const ratingChanged = (newRating) => {
    if (Title == "Relevant") validation.setFieldValue("relevant", newRating);
    if (Title == "Difficult") validation.setFieldValue("difficult", newRating);
    if (Title == "Impactful") validation.setFieldValue("impactful", newRating);
    console.log(newRating);
  };
  console.log(value);
  return (
    <div>
      <Col>
        <Col className="d-flex align-items-center gap-2">
          <span>{Title}</span>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor={value === 0 ? "red" : "#ffd700"}
          />
          <span>{Rating}</span>
        </Col>
      </Col>
    </div>
  );
};

export default StarsRating;
