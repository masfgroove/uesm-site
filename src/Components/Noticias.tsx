import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';

// Adicionei 'limite' para podermos controlar quantas notícias aparecem
export function Noticias({ limite }: { limite?: number }) {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://srzd.com/category/carnaval/sao-paulo/feed/')
      .then(res => res.json())
      .then(data => {
        // Se tiver limite, corta o array, se não, mostra todos
        const lista = limite ? data.items.slice(0, limite) : data.items;
        setNoticias(lista);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar notícias:", err);
        setLoading(false);
      });
  }, [limite]);

  return (
    <Container id="noticias" style={{ marginTop: '50px', marginBottom: '50px' }}>
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
          {noticias.map((item, index) => (
            <Col key={index} md={limite === 3 ? 4 : 3} className="mb-4"> {/* Ajusta largura se for 3 ou mais */}
              <Card className="h-100 shadow-sm border-0" style={{ borderLeft: '5px solid #ffc107' }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="text-muted small mb-2">
                    📅 {new Date(item.pubDate).toLocaleDateString('pt-BR')}
                  </Card.Text>
                  
                  <Card.Title style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#212529' }}>
                    {item.title}
                  </Card.Title>

                  <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.description ? item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : 'Clique para ler os detalhes.'}
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