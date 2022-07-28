import "./CurrentDayCard.css";
import React from "react";
import { getSeasonText } from "../types";

export function CurrentDayCard(props) {
  if (!validateProps(props)) {
    return <div />;
  }

  const { currentDay } = props;

  return (
    <div>
      <div className="current-day-card">
        <img src={getCalendarImage()} />
        <div>
          {getSeasonText(currentDay.season)} {currentDay.day}
        </div>
      </div>
    </div>
  );
}

const validateProps = (props) => {
  return props.currentDay && Object.keys(props.currentDay).length > 0;
};

const getCalendarImage = () => {
  return require(`../assets/items/Calendar.png`);
};
