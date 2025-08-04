import './GeradorCracha.css';
function Saudacao(props) {
  return (<>
    <h1 className='no-print'>Olá, {props.nome}!</h1>
    <p className='no-print'>Crie um crachá para o novo funcionário.</p>
    </>
  );
}

export default Saudacao;
