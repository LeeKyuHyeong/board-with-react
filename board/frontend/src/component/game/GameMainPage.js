import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from './card/GameCard';

const fetchGames = async () => {
  const response = await fetch('http://localhost:8011/api/games');
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return await response.json();
};

const GameMainPage = ( {userdata} ) => {
  const [games, setGames] = useState([]);
	const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        const activeGames = data.filter(game => game.useYn === 'Y'); // use_yn 필터링
        setGames(activeGames);
      } catch (error) {
        console.error('Error loading games:', error);
      }
    };

    loadGames();
  }, []);

  return (
    <div className="main-page">
      <h1>미니게임지옥</h1>
			{userdata.role === 'superAdmin' && (
        <button onClick={() => navigate('/edit-games')} className="edit-button">
          Edit
        </button>
      )}
      <div className="game-menu">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameMainPage;
