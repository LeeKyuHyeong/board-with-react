import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/game/card/GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <Link to={game.path}>
        <div className="game-card-content">
          <h3>{game.name}</h3>
          <p>{game.description}</p>
        </div>
      </Link>
    </div>
  );
};


export default GameCard;
