import { useState, useEffect } from 'react'
import ProdutoCard from './components/ProdutoCard'
import './App.css'

const produtosMockados = [
  {
    id: 1,
    nome: "Smartphone Galaxy",
    preco: 1299.99,
    imagem: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=Smartphone",
    descricao: "Smartphone moderno com câmera de alta qualidade e bateria de longa duração."
  },
  {
    id: 2,
    nome: "Notebook Pro",
    preco: 2599.00,
    imagem: "https://via.placeholder.com/300x200/059669/ffffff?text=Notebook",
    descricao: "Notebook profissional com processador i7 e 16GB de RAM para alta performance."
  },
  {
    id: 3,
    nome: "Fone Bluetooth",
    preco: 299.50,
    imagem: "https://via.placeholder.com/300x200/dc2626/ffffff?text=Fone",
    descricao: "Fone de ouvido sem fio com cancelamento de ruído e qualidade premium."
  },
  {
    id: 4,
    nome: "Tablet Ultra",
    preco: 899.90,
    imagem: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Tablet",
    descricao: "Tablet com tela de 10 polegadas e suporte para caneta digital."
  },
  {
    id: 5,
    nome: "Smartwatch Fit",
    preco: 459.99,
    imagem: "https://via.placeholder.com/300x200/ea580c/ffffff?text=Smartwatch",
    descricao: "Relógio inteligente com monitoramento de saúde e GPS integrado."
  },
  {
    id: 6,
    nome: "Câmera Digital",
    preco: 1899.00,
    imagem: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Camera",
    descricao: "Câmera digital profissional com lente intercambiável e gravação 4K."
  },
  {
    id: 7,
    nome: "Console Gamer",
    preco: 2199.99,
    imagem: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Console",
    descricao: "Console de última geração com gráficos ultra-realistas e jogos exclusivos."
  }
]


const buscarProdutos = () => {
  return new Promise((resolve) => {
    
    setTimeout(() => {
      resolve(produtosMockados)
    }, 2000)
  })
}

function App() {
  
  const [produtos, setProdutos] = useState([])
  
  
  const [loading, setLoading] = useState(true)
  
  
  const [erro, setErro] = useState(null)

 
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    imagem: '',
    descricao: ''
  })

  
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true)
        setErro(null)
        console.log('🔄 Carregando produtos da API...')
        
        const produtosCarregados = await buscarProdutos()
        
        setProdutos(produtosCarregados)
        console.log('✅ Produtos carregados com sucesso:', produtosCarregados.length, 'produtos')
      } catch (error) {
        console.error('❌ Erro ao carregar produtos:', error)
        setErro('Erro ao carregar produtos. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    carregarProdutos()
  }, []) 

  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.nome.trim() || !formData.preco || !formData.descricao.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios (nome, preço e descrição).')
      return
    }

    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1
    const novoProduto = {
      id: novoId,
      nome: formData.nome.trim(),
      preco: parseFloat(formData.preco),
      imagem: formData.imagem.trim() || `https://via.placeholder.com/300x200/6366f1/ffffff?text=${encodeURIComponent(formData.nome)}`,
      descricao: formData.descricao.trim()
    }

    setProdutos([...produtos, novoProduto])

    setFormData({
      nome: '',
      preco: '',
      imagem: '',
      descricao: ''
    })

    setMostrarFormulario(false)

    alert('Produto adicionado com sucesso!')
  }

  const tentarNovamente = () => {
    window.location.reload()
  }

  return (
    <>
      <h1>Loja de Produtos</h1>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Carregando produtos...</p>
        </div>
      )}

      {erro && (
        <div className="error-container">
          <p className="error-text">❌ {erro}</p>
          <button onClick={tentarNovamente} className="btn-retry">
            Tentar Novamente
          </button>
        </div>
      )}

      {!loading && !erro && (
        <>
          <p>Total de produtos: {produtos.length}</p>
          
          <div className="form-toggle">
            <button 
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="btn-toggle"
            >
              {mostrarFormulario ? 'Cancelar' : 'Adicionar Novo Produto'}
            </button>
          </div>

          {mostrarFormulario && (
            <form onSubmit={handleSubmit} className="produto-form">
              <h2>Adicionar Novo Produto</h2>
              
              <div className="form-group">
                <label htmlFor="nome">Nome do Produto *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do produto"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preco">Preço *</label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="imagem">URL da Imagem (opcional)</label>
                <input
                  type="url"
                  id="imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição *</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Digite a descrição do produto"
                  rows="3"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Adicionar Produto
                </button>
                <button 
                  type="button" 
                  onClick={() => setMostrarFormulario(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
          
          <div className="produtos-container">
            {produtos.map(produto => (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                imagem={produto.imagem}
                descricao={produto.descricao}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default App
