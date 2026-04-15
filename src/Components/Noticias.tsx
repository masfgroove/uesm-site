import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

export function Noticias({ limite }: { limite?: number }) {
  const [noticiasSRzd, setNoticiasSRzd] = useState<any[]>([]);
  const [noticiasUESM, setNoticiasUESM] = useState<any[]>([]); // Suas notícias do MongoDB
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // 1. BUSCA SUAS NOTÍCIAS NO MONGODB (via seu backend no Render)
        const resUesm = await fetch('https://render-backend-sl5b.onrender.com/noticias-uesm');
        const dadosUesm = await resUesm.json();
        setNoticiasUESM(dadosUesm);

        // 2. BUSCA NOTÍCIAS DO CARNAVAL SP (SRzd)
        const resSrzd = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://srzd.com/category/carnaval/sao-paulo/feed/');
        const dadosSrzd = await resSrzd.json();
        
        const listaSrzd = limite ? dadosSrzd.items.slice(0, limite) : dadosSrzd.items;
        setNoticiasSRzd(listaSrzd);
        
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar notícias:", err);
        setLoading(false);
      }
    };

    carregarDados();
  }, [limite]);

  return (
    <Container id="noticias" style={{ marginTop: '50px', marginBottom: '50px' }}>
      
      {/* --- SEÇÃO 1: NOTÍCIAS AUTORAIS UESM --- */}
      {noticiasUESM.length > 0 && (
        <div className="mb-5">
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 'bold', color: '#006400' }}>🏆 Destaques UESM</h2>
            <p className="text-muted">Notícias oficiais das Maquetes e Ligas</p>
          </div>
          <Row>
            {noticiasUESM.map((noticia) => (
              <Col key={noticia._id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0" style={{ borderTop: '5px solid #006400' }}>
                  <Card.Img variant="top" src={noticia.imagem || "img/default-news.jpg"} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <small className="text-success fw-bold">{noticia.categoria}</small>
                    <Card.Title className="mt-2" style={{ fontWeight: 'bold' }}>{noticia.titulo}</Card.Title>
                    <Card.Text className="text-muted small">
                      {noticia.subtitulo}
                    </Card.Text>
                    <Button 
                      variant="success" 
                      className="mt-auto fw-bold"
                      href={`/noticia/${noticia._id}`}
                    >
                      Ler notícia completa
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <hr className="my-5" />
        </div>
      )}

      {/* --- SEÇÃO 2: NOTÍCIAS DO CARNAVAL PAULISTANO (SRzd) --- */}
      <div className="text-center mb-5">
        <h2 style={{ fontWeight: 'bold', color: '#333' }}>📰 Notícias do Carnaval</h2>
        <p className="text-muted">Fique por dentro do que acontece no samba paulistano</p>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
          <p className="mt-2">Buscando novidades...</p>
        </div>
      ) : (
        <Row>
          {noticiasSRzd.map((item, index) => (
            <Col key={index} md={limite === 3 ? 4 : 3} className="mb-4">
              <Card className="h-100 shadow-sm border-0" style={{ borderLeft: '5px solid #ffc107' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="text-muted small mb-2">
                    📅 {new Date(item.pubDate).toLocaleDateString('pt-BR')}
                  </Card.Text>
                  <Card.Title style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#212529' }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.description ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 80) + '...' : 'Clique para ler no portal.'}
                  </Card.Text>
                  <Button 
                    variant="outline-warning" 
                    className="mt-auto fw-bold"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    Ler no SRzd
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}