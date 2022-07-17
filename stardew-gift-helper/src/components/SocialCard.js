import "./SocialCard.css";
import React from "react";

import FullHeart from "../assets/hearts/FullHeart.png";
import EmptyHeart from "../assets/hearts/EmptyHeart.png";

export function SocialCard(props) {
  const fullHearts = Math.floor(props.data.points / 250);
  const matchingLoved = props.matching.lovedGifts;
  const matchingLiked = props.matching.likedGifts;
  const matchingNeutral = props.matching.neutralGifts;
  const totalHearts = 10;

  return (
    <div className="social-card">
      <div className="social-card-npc">
        <img className="social-card-avatar" src={getIcon(props.data.name)} />
        <div className="social-card-info">
          <p>{props.data.name}</p>
          <div className="social-card-points">
            {renderSocialHearts(fullHearts, totalHearts)}
          </div>
        </div>
      </div>
      <div className="social-card-gifts">
        {renderMatchingGifts(matchingLoved, matchingLiked, matchingNeutral)}
      </div>
    </div>
  );
}

const renderMatchingGifts = (lovedGifts, likedGifts, neutralGifts) => {
  const lovedItems = lovedGifts.map((gift, idx) => (
    <div
      key={"loved" + idx}
      className="social-card-single-gift"
      style={{ backgroundColor: "#ffd901" }}
    >
      {gift}
    </div>
  ));
  const likedItems = likedGifts.map((gift, idx) => (
    <div
      key={"liked" + idx}
      className="social-card-single-gift"
      style={{ backgroundColor: "#ffbeae" }}
    >
      {gift}
    </div>
  ));
  const neutralItems = neutralGifts.map((gift, idx) => (
    <div
      key={"neutral" + idx}
      className="social-card-single-gift"
      style={{ backgroundColor: "#bcc4c7" }}
    >
      {gift}
    </div>
  ));
  const allItems = [...lovedItems, ...likedItems, ...neutralItems];
  return <div className="social-card-gift-list">{allItems}</div>;
};

const renderSocialHearts = (full, total) => {
  const fullHearts = [...Array(full)].map((_, idx) => (
    <img key={idx} className="social-card-heart" src={FullHeart} />
  ));
  const emptyHearts = [...Array(total - full)].map((_, idx) => (
    <img key={full + idx} className="social-card-heart" src={EmptyHeart} />
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
