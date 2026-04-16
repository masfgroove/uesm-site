import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'; // Importei o Link para navegação rápida
import { Container, Spinner, Alert } from "react-bootstrap";

export function PaginaNoticias() {
  const { id } = useParams(); 
  const [noticia, setNoticia] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // AJUSTE AQUI: Mudamos para localhost:3000 para ler do seu PC
    fetch(`http://localhost:3000/noticias-uesm/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Não encontramos essa notícia no seu servidor local.");
        return res.json();
      })
      .then(dados => {
        setNoticia(dados);
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro:", err);
        setErro(err.message);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-dark">Buscando notícia no banco local...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <strong>Atenção:</strong> {erro} <br />
          Verifique se o seu terminal do backend (porta 3000) está ligado.
        </Alert>
        <Link to="/" className="btn btn-success">← Voltar para a Home</Link>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Container className="py-5 text-dark">
        {/* Imagem */}
        <div className="text-center mb-4">
          <img 
            src={noticia.imagem || "https://via.placeholder.com/800x400?text=Sem+Imagem"} 
            className="img-fluid rounded shadow" 
            style={{ maxHeight: '500px', width: '100%', objectFit: 'cover' }} 
            alt={noticia.titulo} 
          />
        </div>

        {/* Título e Infos */}
        <h1 className="fw-bold mb-3" style={{ color: '#006400' }}>{noticia.titulo}</h1>
        <h4 className="text-muted mb-4">{noticia.subtitulo}</h4>
        <div className="mb-4">
            <span className="badge bg-success">{noticia.categoria}</span>
            <span className="ms-3 text-muted small">
                {noticia.data ? new Date(noticia.data).toLocaleDateString('pt-BR') : ''}
            </span>
        </div>
        <hr />

        {/* Conteúdo Real da Notícia */}
        <div 
          className="mt-4" 
          style={{ 
            whiteSpace: 'pre-wrap', 
            fontSize: '1.2rem', 
            lineHeight: '1.8',
            textAlign: 'justify'
          }}
        >
          {noticia.conteudo}
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="btn btn-success fw-bold px-5 py-2">
            ← VOLTAR PARA O PORTAL UESM
          </Link>
        </div>
      </Container>
    </div>
  );
}