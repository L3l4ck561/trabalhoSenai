import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import './buscadorCep.css'
import {
    TextField, // Substitui o input type='text'
    Container, // Ajuda a centralizar e limitar a largura
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material"

function BuscadorCep() {
    const [numeroCEP, setNumeroCEP] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [address, setAddress] = useState(null);
    const [cepBusca, setCepBusca] = useState('');
    const [erro, setErro] = useState(null);

    const [cidade, setCidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        if (!cepBusca) return;

        const buscarDados = async () => {
            setErro(null);
            setAddress(null);
            setCarregando(true)
            try {
                const resposta = await axios.get(`https://viacep.com.br/ws/${cepBusca}/json/`);

                if (resposta.data.erro) {
                    setErro("Endereço não encontrado");
                    return;
                }

                setAddress(resposta.data);
                setRua(resposta.data.logradouro);
                setCidade(resposta.data.localidade);
                setEstado(resposta.data.uf);
                setBairro(resposta.data.bairro);
            } catch (error) {
                setErro("Erro ao buscar o endereço");
                console.error(error);
            } finally {
                setCarregando(false)
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
        // <main className='buscador-container'>
        //     <form onSubmit={handleBusca}>
        //         <h2>
        //             <label>Digite seu CEP para obter mais informações</label><br />
        //         </h2>

        //         <input
        //             name="cep"
        //             type="text"
        //             value={numeroCEP}
        //             onChange={(e) => setNumeroCEP(e.target.value)}
        //             maxLength="9"
        //             placeholder='Digite seu CEP'
        //         /><br/>
        //         <button type="submit">Buscar endereço</button>
        //     </form>

        //     <section>
        //         {erro && <p className='erro'>{erro}</p>}

        //         {address && (
        //             <div className='resultado-endereco'>
        //                 <p>Rua: {address.logradouro}</p>
        //                 <p>Bairro:{address.bairro}</p>
        //                 <p>Cidade: {address.localidade}</p>
        //                 <p>Estado: {address.uf}</p>
        //             </div>
        //         )}
        //     </section>
        // </main>

        // A prop maxWidth="sm" define a largura como small
        // A prop sx permite adicionar estilos css
        // mt:4 signofica marginTop 4
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant='h4' component="h1" gutterBottom textAlign="center">
                        BuscadorCep
                    </Typography>
                    <form onSubmit={handleBusca}>
                    <TextField
                        label="Digite um CEP"
                        variant='outlined'
                        fullWidth
                        value={numeroCEP}
                        onChange={(e) => setNumeroCEP(e.target.value)}
                        inputProps={{ maxLength: 9 }}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit">Buscar endereço</Button>
                    </form>
                    {carregando && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
                    {erro && <Alert severity='error' >{erro}</Alert>}
                    {address && (
                        <Card variant="outlined" sx={{ mt: 2, p: 2, backgroundColor: "f5f5f5" }}>
                            <Typography variant='h6'>Endereço encontrado:</Typography>
                            <Typography>Logradouro: <TextField value={rua} onChange={(e) => setRua(e.value)}/></Typography>
                            <Typography>Bairro: <TextField value={bairro} onChange={(e) => setBairro(e.value)}/></Typography>
                            <Typography>Cidade: <TextField value={cidade} onChange={(e) => setCidade(e.value)}/></Typography>
                            <Typography>Estado: <TextField value={estado} onChange={(e) => setEstado(e.value)}/></Typography>
                        </Card>
                    )}

                </CardContent>
            </Card>
        </Container>
    );
}

export default BuscadorCep;
