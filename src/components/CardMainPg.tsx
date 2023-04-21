import React from "react";
import "../styles/CardMainpg.scss";

interface CardData {
  cardTitle: string;
  cardImg: string;
  cardDes: string;
}

interface CardMainPgProps {
  cardData: CardData;
}

const CardMainPg: React.FC<CardMainPgProps> = ({ cardData }) => {
  return (
    <div className="col">
      <div className="card card-main h-100">
        <img src={cardData.cardImg} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{cardData.cardTitle}</h5>
          <p className="card-text">{cardData.cardDes}</p>
        </div>
        <ul className="list-group list-group-flush text-center p-2">
          <li>Explore Now!</li>
        </ul>
      </div>
    </div>
  );
};

export default CardMainPg;
