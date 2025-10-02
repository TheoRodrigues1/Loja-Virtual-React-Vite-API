import './ProdutoCard.css'

function ProdutoCard({ nome, preco, imagem, descricao }) {
  return (
    <div className="produto-card">
      <div className="produto-imagem">
        <img src={imagem} alt={nome} />
      </div>
      <div className="produto-info">
        <h3 className="produto-nome">{nome}</h3>
        <p className="produto-preco">R$ {preco.toFixed(2)}</p>
        <p className="produto-descricao">{descricao}</p>
      </div>
    </div>
  )
}

export default ProdutoCard