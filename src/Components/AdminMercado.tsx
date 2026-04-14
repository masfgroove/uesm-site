import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Table, Card } from "react-bootstrap";

export function AdminMercado() {
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

    const API_URL = "https://render-backend-sl5b.onrender.com/produtos";

    const carregarProdutos = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(dados => setProdutos(dados))
            .catch(err => console.error("Erro ao carregar lista:", err));
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    // FUNÇÃO PARA EXCLUIR PRODUTO
    const excluirProduto = async (id: string) => {
        if (window.confirm("Tem certeza que deseja remover este item da UESM?")) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setStatus({ tipo: "success", mensagem: "Produto excluído com sucesso! 🗑️" });
                    carregarProdutos(); 
                } else {
                    setStatus({ tipo: "danger", mensagem: "Erro ao excluir produto." });
                }
            } catch (error) {
                setStatus({ tipo: "danger", mensagem: "Erro na conexão com o banco." });
            }
        }
    };

    const prepararEdicao = (p: any) => {
        setIdEditando(p._id);
        setTitulo(p.titulo);
        setPreco(p.preco);
        setParcelas(p.parcelas);
        setImagem(p.imagem);
        setLinkAfiliado(p.linkAfiliado);
        setCategoria(p.categoria);
        setGarantia(p.garantia);
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
                    mensagem: idEditando ? "Alterado na UESM com sucesso!" : "Cadastrado na UESM com sucesso!" 
                });
                limparFormulario();
                carregarProdutos();
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro na conexão com o banco." });
        }
    };

    return (
        <Container id="AdminMercado" className="py-5">
            <Card className="shadow p-4 mb-5 border-0">
                <h2 className="text-center mb-4 fw-bold" style={{color: '#006400'}}>
                    PAINEL ADMINISTRATIVO UESM
                </h2>
                
                {status.mensagem && <Alert variant={status.tipo}>{status.mensagem}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Nome do Item</Form.Label>
                        <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} required placeholder="Ex: Franjas de Seda..." />
                    </Form.Group>

                    <div className="d-flex gap-3 align-items-end">
                        <Form.Group className="mb-3 w-50">
                            <Form.Label className="fw-bold">Preço (R$)</Form.Label>
                            <Form.Control value={preco} onChange={e => setPreco(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-3 w-50">
                            <Form.Label className="fw-bold">Categoria</Form.Label>
                            {/* Datalist permite selecionar as existentes ou digitar uma nova livremente */}
                            <Form.Control 
                                list="categorias-existentes"
                                value={categoria} 
                                onChange={e => setCategoria(e.target.value)} 
                                placeholder="Selecione ou digite nova"
                                required
                            />
                            <datalist id="categorias-existentes">
                                <option value="Maquetes" />
                                <option value="Missangas" />
                            </datalist>
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">URL da Imagem</Form.Label>
                        <Form.Control value={imagem} onChange={e => setImagem(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Link Mercado Livre (Afiliado)</Form.Label>
                        <Form.Control value={linkAfiliado} onChange={e => setLinkAfiliado(e.target.value)} required />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 fw-bold py-2">
                        {idEditando ? "CONFIRMAR ALTERAÇÃO NA UESM" : "CADASTRAR NO BANCO"}
                    </Button>
                    
                    {idEditando && (
                        <Button variant="link" onClick={limparFormulario} className="w-100 mt-2 text-muted">
                            Cancelar e voltar para novo cadastro
                        </Button>
                    )}
                </Form>
            </Card>

            <Card className="shadow p-4 border-0">
                <h3 className="mb-4 text-center">Gerenciar Produtos Atuais</h3>
                <Table hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(p => (
                            <tr key={p._id}>
                                <td className="small">{p.titulo}</td>
                                <td><span className="badge bg-primary">{p.categoria}</span></td>
                                <td>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        onClick={() => prepararEdicao(p)}
                                    >
                                        Editar 🔄
                                    </Button>
                                    
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        className="ms-2" 
                                        onClick={() => excluirProduto(p._id)}
                                    >
                                        Excluir 🗑️
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