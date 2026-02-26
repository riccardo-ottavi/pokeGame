import './App.css'
import { useState, useEffect } from 'react';
import { fetchPokeData, customizePokemon } from './services/pokemonServices';

function App() {
  const totalPokemon = 1025;
  const [player, setPlayer] = useState(null)
  const [enemy, setEnemy] = useState(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    initializeNewGame();
  }, []);

  async function initializeNewGame() {
    setStage(0);
    initializePokemon("player")
    initializePokemon("enemy")
  }

  async function initializePokemon(target) {
    if (target === "player") {
      const base = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
      const customized = await customizePokemon(base);
      setPlayer(customized);
    } else if (target === "enemy") {
      const base = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
      const customized = await customizePokemon(base);
      setEnemy(customized);
    }
  }


  console.log(player)
  console.log(enemy)

  return (

    <div className='main-container'>
      {player && (
        <div>
          <p>{player.name}</p>
          <img src={player.sprites.front_default} alt="" />
        </div>

      )}
      {enemy && (
        <div>
          <p>{enemy.name}</p>
          <img src={enemy.sprites.front_default} alt="" />
        </div>
      )}
    </div>


  )
}

export default App
