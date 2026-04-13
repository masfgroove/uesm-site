import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export function Mercado() {
    const [itens, setItens] = useState<any[]>([]);

    useEffect(() => {
        // Busca os dados no servidor do Render
        fetch('https://render-backend-sl5b.onrender.com/produtos')
            .then(res => res.json())
            .then(dados => setItens(dados))
            .catch(err => console.error("Erro ao carregar mercado:", err));
    }, []);

    return (
        <div id='mercado' className='text-center py-5'>
            <Container>
                <div className='section-title'>
                    <h2>Mercado da Maquete</h2>
                    <p>
                        Confira os produtos e materiais exclusivos das nossas escolas 
                        de samba de maquete.
                    </p>
                </div>

                <Row className="mt-4">
                    {itens.length > 0 ? (
                        itens.map((d, i) => (
                            <Col sm={6} md={4} key={d._id || i} className="mb-4 d-flex align-items-stretch">
                                {/* 'd-flex' na Col e 'w-100' no Card garantem que todos tenham a mesma altura na linha */}
                                <Card className="shadow-sm w-100 border-0">
                                    <Card.Img 
                                        variant="top" 
                                        src={d.imagem} 
                                        style={{ 
                                            height: '200px', 
                                            objectFit: 'contain', 
                                            padding: '15px',
                                            backgroundColor: '#fff' 
                                        }} 
                                    />
                                    <Card.Body className="d-flex flex-column text-center">
                                        {/* minHeight reserva espaço para 2 ou 3 linhas de título */}
                                        <Card.Title className="fs-6 fw-bold" style={{ minHeight: '3.5rem' }}>
                                            {d.titulo}
                                        </Card.Title>

                                        {/* mt-auto empurra todo este bloco para o rodapé do card */}
                                        <div className="mt-auto">
                                            <h4 className="text-success fw-bold">R$ {d.preco}</h4>
                                            <p className="text-muted small mb-2">{d.parcelas}</p>
                                            
                                            <Button 
                                                variant="warning" 
                                                href={d.linkAfiliado} 
                                                target="_blank" 
                                                className="fw-bold w-100 shadow-sm"
                                            >
                                                Ver no Mercado Livre 🚀
                                            </Button>
                                            
                                            <div className="mt-2 text-muted" style={{ fontSize: '10px', opacity: 0.8 }}>
                                                {d.garantia || "Sem garantia"}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div className="w-100 text-center py-5">
                            <p className="text-muted">Carregando produtos do banco de dados...</p>
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
}