import React, { useState, useEffect } from "react"; // Adicionado para gerenciar os dados do banco
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Importamos Card e Button para ficar mais bonito

export function Mercado() {
    const [itens, setItens] = useState<any[]>([]); // Estado para guardar os produtos do banco

    useEffect(() => {
        // Faz a chamada para o seu servidor no Render
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
                            <Col sm={6} md={4} key={d._id || i} className="mb-4">
                                <Card className="shadow-sm h-100">
                                    {/* Exibe a imagem que você cadastrou no Atlas */}
                                    <Card.Img 
                                        variant="top" 
                                        src={d.imagem} 
                                        style={{ height: '200px', objectFit: 'contain', padding: '10px' }} 
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="fs-6">{d.titulo}</Card.Title>
                                        <h4 className="text-success">R$ {d.preco}</h4>
                                        <p className="text-muted small">{d.parcelas}</p>
                                                                                
                                        {/* Botão que leva para o seu link de afiliado */}
                                        <Button 
                                            variant="warning" 
                                            href={d.linkAfiliado} 
                                            target="_blank" 
                                            className="fw-bold"
                                        >
                                            Ver no Mercado Livre 🚀
                                        </Button>
                                        <div className="mt-2" style={{fontSize: '10px'}}>{d.garantia}</div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <div className="w-100 text-center">Carregando produtos do banco de dados...</div>
                    )}
                </Row>
            </Container>
        </div>
    );
}