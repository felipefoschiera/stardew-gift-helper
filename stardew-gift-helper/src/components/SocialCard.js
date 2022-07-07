import "./SocialCard.css";
import React from "react";

import FullHeart from "../assets/hearts/FullHeart.png";
import EmptyHeart from "../assets/hearts/EmptyHeart.png";

export function SocialCard(props) {
  const fullHearts = Math.floor(props.data.points / 250);
  const totalHearts = 10;

  return (
    <div className="social-card">
      <img className="social-card-avatar" src={getIcon(props.data.name)} />
      <div className="social-card-info">
        <p>{props.data.name}</p>
        <div className="social-card-points">
          {renderSocialHearts(fullHearts, totalHearts)}
        </div>
      </div>
    </div>
  );
}

const renderSocialHearts = (full, total) => {
  const fullHearts = [...Array(full)].map(() => (
    <img className="social-card-heart" src={FullHeart} />
  ));
  const emptyHearts = [...Array(total - full)].map(() => (
    <img className="social-card-heart" src={EmptyHeart} />
  ));
  return fullHearts.concat(emptyHearts);
};

const getIcon = (name) => {
  try {
    return require(`../assets/npcs/${name}_Icon.png`);
  } catch (err) {
    return require(`../assets/npcs/Linus_Icon.png`);
  }
};
