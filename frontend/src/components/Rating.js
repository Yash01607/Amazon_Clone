import React from "react";

function Rating(props) {
  let rating = props.rating;
  let caption = props.caption;
  const numReviews = props.numReviews;
  const reduceRating = () => {
    rating--;
  };
  return (
    <div className="rating row">
      {numReviews !== "" && <p>{numReviews} customer reviews </p>}
      <div>
        <span key="1">
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
          {reduceRating()}
        </span>
        <span key="2">
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
          ></i>
          {reduceRating()}
        </span>
        <span key="3">
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
            key="3"
          ></i>
          {reduceRating()}
        </span>
        <span key="4">
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
            key="4"
          ></i>
          {reduceRating()}
        </span>
        <span key="5">
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-o"
                : "fa fa-star-o"
            }
            key="5"
          ></i>
          {reduceRating()}
        </span>
        {caption && <span>{caption}</span>}
      </div>
    </div>
  );
}

export default Rating;
