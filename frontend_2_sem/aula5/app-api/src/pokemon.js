import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokemon.css"

function BuscadorItem() {
  const [ nomePokemon, setNomePokemon ] = useState("");
  const [ termoBusca, setTermoBusca ] = useState("");
  const [ dadosPokemon, setDadosPokemon ] = useState(null);
  const [ carregando, setCarregando ] = useState(false);
  const [ erro, setErro ] = useState(null);

  useEffect ( () => {
    if(!termoBusca) {
      return;
    }

    const buscarDados = async() => {
      setCarregando(true);
      setErro(null);
      setDadosPokemon(null);

      try {
        const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${termoBusca.toLowerCase()}`)
        // resposta.data é para que não venha o corpo do dado JSON, mas somente os dados (data)
        setDadosPokemon(resposta.data)
      } catch (error) {
        setErro("Pokémon não encontrado!")
        console.error(error)
      } finally {
        setCarregando(false)
      }
    }

    buscarDados();
  }, [termoBusca]);

  // 
  const handleBusca = (evento) => {
    // Vai executar após o evento de click no botão
    evento.preventDefault();
    // Atualiza a variável termoBusca que é a condição para executar o useEffect
    setTermoBusca(nomePokemon)
  }

  return (
    <main className="buscador-container-p">
      <h1>Buscador de Pokémon</h1>
      <form className="buscador-form" onSubmit={handleBusca}>
        <input
        type="text"
        value={nomePokemon}
        onChange={(e) => setNomePokemon(e.target.value)} 
        placeholder="Digite o nome de um Pokémon"/>
        <button type="submit">Buscar</button>
      </form>
      {/* Seção de Resultado */}
      <section className="resultado-container">
        {carregando && <img src='' alt="*" />} {/* Alterar para simbolo de carregamento */}
        {erro && <p className="erro">{erro}</p>}
        {dadosPokemon && ( 
          <div className="pokemon-card">
            <h2>{dadosPokemon.name}</h2>
            <img src={dadosPokemon?.sprites?.front_default} alt={dadosPokemon.name} />
            <div className="tipos">
              <p>Tipos:</p> {/* Pode Alterar a tag p */}
              {dadosPokemon.types.map(tipoInfo => (
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

export default BuscadorItem;