import './App.css'
import { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = useState(null)
  const [enemy, setEnemy] = useState(null)
  const [stage, setStage] = useState(0)

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
    setStage(0);
    initializePokemon("player")
    initializePokemon("enemy")
  }

  async function createMoveSet(poke){
    const possibleSet = [poke.moves[0].move.name, poke.moves[1].move.name, poke.moves[2].move.name, poke.moves[3].move.name]
    const newSet = await Promise.all(possibleSet.map(move => fetchMoveData(move)));
    return newSet
  }

  async function fetchMoveData(name){
    const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
    const data = await response.json()
    return data
  }

  async function customizePokemon(data){
    data.exp = 0;
    data.expToNextLevel = 1000;
    data.level = 5;
    data.actualStats = {
      hp:data.stats[0].base_stat,
      att: data.stats[1].base_stat,
      def: data.stats[2].base_stat,
      spAtt: data.stats[3].base_stat,
      spDef: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    }
    data.persistenStatus = null;
    data.volatileStatus = null;
    data.moveSet = await createMoveSet(data)
  }

  async function initializePokemon(target) {
    if (target === "player") {
      const playerPoke = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
      await customizePokemon(playerPoke)
      setPlayer(playerPoke);
    } else if (target === "enemy") {
      const enemyPoke = await fetchPokeData(Math.floor(Math.random() * totalPokemon) + 1);
      await customizePokemon(enemyPoke)
      setEnemy(enemyPoke)
    }
  }

  console.log(player)
  console.log(enemy)

  return (
    <>
      <h1>PokeGame</h1>
      {player && (
        <img src={player.sprites.front_default} alt="" />
      )}
      {enemy && (
        <img src={enemy.sprites.front_default} alt="" />
      )}
      <button onClick={() => console.log(player)}>Show Player</button>
    </>
  )
}

export default App
