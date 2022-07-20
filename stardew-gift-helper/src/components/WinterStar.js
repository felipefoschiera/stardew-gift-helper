import "./WinterStar.css";
import React from "react";
import { Season } from "../types";

export function WinterStar(props) {
  if (!validateProps(props)) {
    return <div />;
  }

  const { currentDay } = props;

  if (!isWinterStar(currentDay)) {
    return <div />;
  }

  return (
    <div>
      <div className="winter-star-card">
        <img src={getWinterStarImage()} />
        <div>
          Today is the Feast of the Winter Star festival! Give gifts in the
          festival for <b>5x</b> social points.
        </div>
      </div>
    </div>
  );
}

const isWinterStar = (currentDay) => {
  return currentDay.season == Season.Winter && currentDay.day == 25;
};

const validateProps = (props) => {
  return props.currentDay && Object.keys(props.currentDay).length > 0;
};

const getWinterStarImage = () => {
  return require(`../assets/items/Gift_Icon.png`);
};
