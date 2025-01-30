import { useState } from 'react';
import styles from '../styles/Register.module.css';
import { Button } from '@mui/material';

export default function Registrar() {
  const [nomeCarro, setNomeCarro] = useState('');
  const [marca, setMarca] = useState('');
  const [imagem, setImagem] = useState('');
  const [cor, setCor] = useState('');
  const [preco, setPreco] = useState('');

  const Registrar = async (event) => {
    event.preventDefault();
    console.log('Registrando Carro...');
    try {
      await fetch('http://localhost:3000/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeCarro: nomeCarro,
          marca: marca,
          imagem: imagem,
          cor: cor,
          preco: preco
        })
      });
      console.log('Carro registrado com sucesso!');
      alert("Carro registrado com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro na API");
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Registro de Carros:</h1>
      <form onSubmit={Registrar}>
        <input placeholder="Insira o nome do carro" value={nomeCarro} onChange={(event) => setNomeCarro(event.target.value)} />
        <input placeholder="Insira a marca do carro" value={marca} onChange={(event) => setMarca(event.target.value)} />
        <input placeholder="Insira o link da imagem" value={imagem} onChange={(event) => setImagem(event.target.value)} />
        <input placeholder="Insira a cor do carro" value={cor} onChange={(event) => setCor(event.target.value)} />
        <input placeholder="Insira o preço do carro" type="number" value={preco} onChange={(event) => setPreco(event.target.value)} />
        <Button variant="contained" color="success" type="submit">Registrar</Button>
      </form>
    </main>
  );
}