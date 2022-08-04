import "./BirthdayCard.css";
import React from "react";

export function BirthdayCard(props) {
  if (!validateProps(props)) {
    return <div />;
  }

  const { birthdays, currentDay } = props;
  const npcBirthday = getBirthdayToday(birthdays, currentDay);

  if (npcBirthday.length === 0) {
    return <div />;
  }

  return (
    <div>
      {npcBirthday.map((npc) => (
        <div key={npc} className="birthday-card">
          <img alt="Birthday" src={getBirthdayImage()} />
          <div>
            Today is {npc}'s birthday! Give them a gift for <b>8x</b> social
            points.
          </div>
        </div>
      ))}
    </div>
  );
}

const validateProps = (props) => {
  return (
    props.birthdays &&
    Object.keys(props.birthdays).length > 0 &&
    props.currentDay &&
    Object.keys(props.currentDay).length > 0
  );
};

const isBirthday = (birthday, currentDay) => {
  return (
    birthday.season === currentDay.season && birthday.day === currentDay.day
  );
};

const getBirthdayToday = (birthdays, currentDay) => {
  return Object.entries(birthdays)
    .filter((value) => isBirthday(value[1], currentDay))
    .map((value) => value[0]);
};

const getBirthdayImage = () => {
  return require(`../assets/items/Party_Hat.png`);
};
