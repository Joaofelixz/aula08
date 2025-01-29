import listaProdutosStyles from '../styles/ListaProdutos.module.css';

export default function ListaProdutos({ produtos, removerCarro }) {
  return (
    <div className={listaProdutosStyles.displayProdutos}>
      {produtos.map(produto => (
        <div key={produto.id} className={listaProdutosStyles.produtoItem}>
          <h2 className={listaProdutosStyles.produtoNome}>{produto.nomeCarro}</h2>
          <img className={listaProdutosStyles.produtoImagem} src={produto.imagem} alt={produto.imagem} />
          <p className={listaProdutosStyles.produtoPreco}>Preço: R${produto.preco}</p>
          <p className={listaProdutosStyles.produtoDetalhes}>
          <span>Cor:</span> {produto.cor}
          </p>
          <div className={listaProdutosStyles.botaoContainer}>
            <a href={`/alterar/${produto.id}`}>
    <button className={listaProdutosStyles.botaoEditar}>Editar</button>
            </a>
            <button
  className={listaProdutosStyles.botaoRemover}
  onClick={() => removerCarro(produto.id)}
>
  Remover
</button>

          </div>
        </div>
      ))}
    </div>
  );
}