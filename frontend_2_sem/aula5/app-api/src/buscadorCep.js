import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './buscadorCep.css'

function BuscadorCep() {
    const [numeroCEP, setNumeroCEP] = useState('');
    const [address, setAddress] = useState(null);
    const [cepBusca, setCepBusca] = useState('');
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!cepBusca) return;

        const buscarDados = async () => {
            setErro(null);
            setAddress(null);

            try {
                const resposta = await axios.get(`https://viacep.com.br/ws/${cepBusca}/json/`);

                if (resposta.data.erro) {
                    setErro("Endereço não encontrado");
                    return;
                }

                setAddress(resposta.data);
            } catch (error) {
                setErro("Erro ao buscar o endereço");
                console.error(error);
            }
        };

        buscarDados();
    }, [cepBusca]);

    const handleBusca = (evento) => {
        evento.preventDefault();
        if (numeroCEP.trim() === "") {
            setErro("Por favor, digite um CEP válido");
            return;
        }
        setCepBusca(numeroCEP);
    };

    return (
        <main className='buscador-container'>
            <form onSubmit={handleBusca}>
                <h2>
                    <label>Digite seu CEP para obter mais informações</label><br />
                </h2>

                <input
                    name="cep"
                    type="text"
                    value={numeroCEP}
                    onChange={(e) => setNumeroCEP(e.target.value)}
                    maxLength="9"
                    placeholder='Digite seu CEP'
                /><br/>
                <button type="submit">Buscar endereço</button>
            </form>

            <section>
                {erro && <p className='erro'>{erro}</p>}

                {address && (
                    <div className='resultado-endereco'>
                        <p>Rua: {address.logradouro}</p>
                        <p>Bairro:{address.bairro}</p>
                        <p>Cidade: {address.localidade}</p>
                        <p>Estado: {address.uf}</p>
                    </div>
                )}
            </section>
        </main>
    );
}

export default BuscadorCep;
