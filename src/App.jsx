import './App.css'
import { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = useState(null)
  const [enemy, setEnemy] = useState(null)

  const endPoint = "https://pokeapi.co/api/v2/pokemon/"
  const totalPokemon = 1025;


  async function fetchPokeData(id) {
    const response = await fetch(`${endPoint}/${id}`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    initializeNewGame();
  }, []);

  async function initializeNewGame() {
    const playerPoke = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
    setPlayer(playerPoke);
    const enemyPoke = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
    setEnemy(enemyPoke)
  }

  console.log(player)
  console.log(enemy)

  return (
    <>
      <h1>PokeGame</h1>
      {player &&(
        <img src={player.sprites.front_default} alt="" />
      )}
      {enemy &&(
        <img src={enemy.sprites.front_default} alt="" />
      )}
      
    </>
  )
}

export default App
