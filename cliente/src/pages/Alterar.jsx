import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styles from "../styles/Alterar.module.css";

export default function Alterar() {
  const { id } = useParams();
  const [nomeCarro, setNomeCarro] = useState("");
  const [marca, setMarca] = useState("");
  const [imagem, setImagem] = useState("");
  const [cor, setCor] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    const buscarCarro = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/carros/${id}`);
        const dados = await resposta.json();
        setNomeCarro(dados.nomeCarro);
        setMarca(dados.marca);
        setImagem(dados.imagem);
        setCor(dados.cor);
        setPreco(dados.preco);
      } catch {
        alert("Ocorreu um erro na API!");
      }
    };
    buscarCarro();
  }, [id]);

  const editarCarro = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3000/carros/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCarro,
          marca,
          imagem,
          cor,
          preco: parseFloat(preco)
        })
      });
      if (resposta.ok) {
        alert("Produto salvo com sucesso!");
      } else {
        throw new Error("Erro na atualização do produto");
      }
    } catch (error) {
      alert("Ocorreu um erro na atualização do produto!");
      console.log("Erro: informações não editadas", error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Editar Carro</h1>
      <form onSubmit={editarCarro}>
        <p>Nome do Carro:</p>
        <input type="text" value={nomeCarro} onChange={(event) => setNomeCarro(event.target.value)} />
        <p>Marca</p>
        <input value={marca} onChange={(event) => setMarca(event.target.value)} />
        <p>Imagem:</p>
        <input value={imagem} onChange={(event) => setImagem(event.target.value)} />
        <p>Cor:</p>
        <input value={cor} onChange={(event) => setCor(event.target.value)} />
        <p>Preço:</p>
        <input type="number" value={preco} onChange={(event) => setPreco(event.target.value)} />
        <button type="submit">Salvar Alterações</button>
        <br />
      </form>
    </div>
  );
}