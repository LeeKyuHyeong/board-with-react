import React, { useEffect, useState } from 'react';

const fetchGames = async () => {
  const response = await fetch('http://localhost:8011/api/games');
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return await response.json();
};

const updateGame = async (game) => {

  const response = await fetch(`http://localhost:8011/api/games/${game.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  });
  if (!response.ok) {
    throw new Error('Failed to update game');
  }
  return await response;
};

const EditGamePage = () => {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (error) {
        console.error('Error loading games:', error);
      }
    };

    loadGames();
  }, [editingGame]);

  const handleSave = async () => {
    if (editingGame) {
      try {
        await updateGame(editingGame);
        alert('Game updated successfully!');
        setEditingGame(null);
      } catch (error) {
        console.error('Error updating game:', error);
      }
    }
  };

  return (
    <div className="edit-game-page">
      <h1>Edit Games</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Path</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>
                <input
                  type="text"
                  value={editingGame?.id === game.id ? editingGame.name : game.name}
                  onChange={(e) =>
                    setEditingGame({ ...game, name: e.target.value })
                  }
                  disabled={editingGame?.id !== game.id}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editingGame?.id === game.id ? editingGame.path : game.path}
                  onChange={(e) =>
                    setEditingGame({ ...game, path: e.target.value })
                  }
                  disabled={editingGame?.id !== game.id}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={
                    editingGame?.id === game.id
                      ? editingGame.description
                      : game.description
                  }
                  onChange={(e) =>
                    setEditingGame({ ...game, description: e.target.value })
                  }
                  disabled={editingGame?.id !== game.id}
                />
              </td>
              <td>
                {editingGame?.id === game.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => setEditingGame(game)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditGamePage;
