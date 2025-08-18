import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
var cors = require('cors')
 
App.use(cors())
function BuscadorItem() {
  const [nomePokemon, setNomePokemon] = useState('')
  const [termoBusca, setTermoBusca] = useState('')
  const [dadosPokemon, setDadosPokemon] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!termoBusca) {
      return;
    }

    const buscarDados = async () => {
      setCarregando(true);
      setErro(null);
      setDadosPokemon(null);

      try {
        const resposta = await axios.get(`https://pokeapi.com/api/v2/pokemon/${termoBusca.toLowerCase()}`)
        // para que não venha o corpo do dado json,
        // mas somente os dados (data)
        setDadosPokemon(resposta.data)
      } catch (error) {
        setErro("Pokémon não encontrado!")
        console.error(error)
      } finally {
        setCarregando(false)
      }
    }

    buscarDados();
  }, [termoBusca])

  const handleBusca = (evento) => {
    // executa após o evento do click no botão
    evento.preventDefault();
    // Atualiza o termoBusca que é a condição para executar
    // o useEffect
    setTermoBusca(nomePokemon)
  }

  return (
    <main className='buscador-container'>
        <h1>Buscador de Pokémon</h1>
        <form className='buscador-form' onSubmit={handleBusca}>
          <input
            type='text'
            value={nomePokemon}
            onChange={(e) => setNomePokemon(e.target.value)}
            placeholder='Digite o nome de um Pokémon'
          />
          <button type='submit'>Jogar</button>
        </form>
        <br/>
      {/* Seção de resultado */}
      <section className='resultadoContainer'>
        {carregando && <img src='load.png' className='App-logo' />}
        {erro && <p className='erro'>{erro}</p>}
        {dadosPokemon && (
          <div className='pokemon-card'>
            <h2>{dadosPokemon.name}</h2>
            <img src={dadosPokemon?.sprites?.front_default} alt={dadosPokemon?.name} />
            <div className='tipos'>
              <p>Tipos: </p>
              {dadosPokemon.type.map(tipoInfo => (
                <span key={tipoInfo.type.name} className={`tipo ${tipoInfo.type.name}`}>
                  {tipoInfo.type.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default BuscadorItem