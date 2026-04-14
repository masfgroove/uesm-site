import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

export function Mercado() {
    const [itens, setItens] = useState<any[]>([]);
    
    // Estados para Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const produtosPorPagina = 8;

    useEffect(() => {
        // Busca os dados no servidor do Render
        fetch('https://render-backend-sl5b.onrender.com/produtos')
            .then(res => res.json())
            .then(dados => setItens(dados))
            .catch(err => console.error("Erro ao carregar mercado:", err));
    }, []);

    // Lógica para calcular quais itens mostrar
    const indiceUltimoItem = paginaAtual * produtosPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - produtosPorPagina;
    const itensExibidos = itens.slice(indicePrimeiroItem, indiceUltimoItem);

    // Função para trocar de página e subir para o topo do mercado
    const mudarPagina = (numero: number) => {
        setPaginaAtual(numero);
        const section = document.getElementById('mercado');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Cálculo do número total de páginas
    const totalPaginas = Math.ceil(itens.length / produtosPorPagina);

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
                        itensExibidos.map((d, i) => (
                            // lg={3} garante 4 produtos por linha em telas desktop
                            <Col xs={12} sm={6} md={4} lg={3} key={d._id || i} className="mb-4 d-flex align-items-stretch">
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
                                        <Card.Title className="fs-6 fw-bold" style={{ minHeight: '3.5rem' }}>
                                            {d.titulo}
                                        </Card.Title>

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

                {/* Componente de Paginação */}
                {totalPaginas > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination>
                            <Pagination.Prev 
                                onClick={() => mudarPagina(paginaAtual - 1)} 
                                disabled={paginaAtual === 1}
                            />
                            
                            {[...Array(totalPaginas)].map((_, i) => (
                                <Pagination.Item 
                                    key={i + 1} 
                                    active={i + 1 === paginaAtual}
                                    onClick={() => mudarPagina(i + 1)}
                                    // Estilo para combinar com o tema verde/amarelo
                                    linkStyle={i + 1 === paginaAtual ? {backgroundColor: '#198754', borderColor: '#198754'} : {color: '#198754'}}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next 
                                onClick={() => mudarPagina(paginaAtual + 1)} 
                                disabled={paginaAtual === totalPaginas}
                            />
                        </Pagination>
                    </div>
                )}
            </Container>
        </div>
    );
}