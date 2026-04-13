import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Table, Card } from "react-bootstrap";

export function AdminMercado() {
    // Estados do formulário
    const [idEditando, setIdEditando] = useState<string | null>(null);
    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("");
    const [parcelas, setParcelas] = useState("12x sem juros");
    const [imagem, setImagem] = useState("");
    const [linkAfiliado, setLinkAfiliado] = useState("");
    const [categoria, setCategoria] = useState("Maquetes");
    const [garantia, setGarantia] = useState("Sem garantia");
    
    const [status, setStatus] = useState({ tipo: "", mensagem: "" });
    const [produtos, setProdutos] = useState<any[]>([]);

    // URL da sua API no Render
    const API_URL = "https://render-backend-sl5b.onrender.com/produtos";

    // Busca os produtos para listar no painel
    const carregarProdutos = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(dados => setProdutos(dados))
            .catch(err => console.error("Erro ao carregar lista:", err));
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    // Preenche o formulário para editar
    const prepararEdicao = (p: any) => {
        setIdEditando(p._id);
        setTitulo(p.titulo);
        setPreco(p.preco);
        setParcelas(p.parcelas);
        setImagem(p.imagem);
        setLinkAfiliado(p.linkAfiliado);
        setCategoria(p.categoria);
        setGarantia(p.garantia);
        // Rola a página suavemente até a seção do formulário
        document.getElementById('AdminMercado')?.scrollIntoView({ behavior: 'smooth' });
    };

    const limparFormulario = () => {
        setIdEditando(null);
        setTitulo("");
        setPreco("");
        setImagem("");
        setLinkAfiliado("");
        setCategoria("Maquetes");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const produtoDados = { titulo, preco, parcelas, imagem, linkAfiliado, categoria, garantia };
        
        // Se tem ID, usa PUT (Alterar), se não, usa POST (Cadastrar)
        const metodo = idEditando ? "PUT" : "POST";
        const url = idEditando ? `${API_URL}/${idEditando}` : API_URL;

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produtoDados),
            });

            if (response.ok) {
                setStatus({ 
                    tipo: "success", 
                    mensagem: idEditando ? "Produto atualizado com sucesso!" : "Produto cadastrado com sucesso!" 
                });
                limparFormulario();
                carregarProdutos();
            } else {
                throw new Error();
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro ao processar requisição." });
        }
    };

    return (
        <Container className="py-5">
            <Card className="shadow p-4 mb-5">
                <h2 className="text-center mb-4">
                    {idEditando ? "🔄 Alterar Produto" : "➕ Cadastrar Novo Produto"}
                </h2>
                
                {status.mensagem && <Alert variant={status.tipo}>{status.mensagem}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título do Produto</Form.Label>
                        <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} required />
                    </Form.Group>

                    <div className="d-flex gap-3">
                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Preço (R$)</Form.Label>
                            <Form.Control value={preco} onChange={e => setPreco(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3 w-50">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)}>
                                <option value="Maquetes">Maquetes</option>
                                <option value="Missangas">Missangas</option>
                                <option value="Ferramentas">Ferramentas</option>
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>URL da Imagem</Form.Label>
                        <Form.Control value={imagem} onChange={e => setImagem(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Link de Afiliado (Mercado Livre)</Form.Label>
                        <Form.Control value={linkAfiliado} onChange={e => setLinkAfiliado(e.target.value)} required />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant={idEditando ? "primary" : "success"} type="submit" className="w-100 fw-bold">
                            {idEditando ? "SALVAR ALTERAÇÕES" : "CADASTRAR NO BANCO"}
                        </Button>
                        {idEditando && (
                            <Button variant="secondary" onClick={limparFormulario}>CANCELAR</Button>
                        )}
                    </div>
                </Form>
            </Card>

            <Card className="shadow p-4">
                <h3 className="mb-4 text-center">Gerenciar Produtos</h3>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(p => (
                            <tr key={p._id}>
                                <td>{p.titulo}</td>
                                <td><span className="badge bg-info text-dark">{p.categoria}</span></td>
                                <td>R$ {p.preco}</td>
                                <td>
                                    <Button variant="outline-primary" size="sm" onClick={() => prepararEdicao(p)}>
                                        Editar 🔄
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}