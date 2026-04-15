import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Table, Card, Tabs, Tab } from "react-bootstrap";

export function AdminMercado() {
    // --- ESTADOS PRODUTOS ---
    const [idEditando, setIdEditando] = useState<string | null>(null);
    const [titulo, setTitulo] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [linkAfiliado, setLinkAfiliado] = useState("");
    const [categoria, setCategoria] = useState("Maquetes");
    const [produtos, setProdutos] = useState<any[]>([]);

    // --- ESTADOS NOTÍCIAS UESM ---
    const [idNoticiaEditando, setIdNoticiaEditando] = useState<string | null>(null);
    const [noticiaTitulo, setNoticiaTitulo] = useState("");
    const [noticiaSub, setNoticiaSub] = useState("");
    const [noticiaImg, setNoticiaImg] = useState("");
    const [noticiaConteudo, setNoticiaConteudo] = useState("");
    const [noticiasUesm, setNoticiasUesm] = useState<any[]>([]);

    const [status, setStatus] = useState({ tipo: "", mensagem: "" });

    const API_PRODUTOS = "https://render-backend-sl5b.onrender.com/produtos";
    const API_NOTICIAS = "https://render-backend-sl5b.onrender.com/noticias-uesm";

    const carregarDados = async () => {
        try {
            const [resProd, resNot] = await Promise.all([
                fetch(API_PRODUTOS),
                fetch(API_NOTICIAS)
            ]);
            setProdutos(await resProd.json());
            setNoticiasUesm(await resNot.json());
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    // --- LÓGICA DE PRODUTOS ---
    const handleSubmitProduto = async (e: React.FormEvent) => {
        e.preventDefault();
        const produtoDados = { titulo, preco, imagem, linkAfiliado, categoria };
        const metodo = idEditando ? "PUT" : "POST";
        const url = idEditando ? `${API_PRODUTOS}/${idEditando}` : API_PRODUTOS;

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(produtoDados),
            });

            if (response.ok) {
                setStatus({ tipo: "success", mensagem: "Produto atualizado no banco! 📦" });
                limparFormProduto();
                carregarDados();
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro ao salvar produto." });
        }
    };

    const prepararEdicaoProduto = (p: any) => {
        setIdEditando(p._id);
        setTitulo(p.titulo);
        setPreco(p.preco);
        setImagem(p.imagem);
        setLinkAfiliado(p.linkAfiliado);
        setCategoria(p.categoria);
    };

    const excluirProduto = async (id: string) => {
        if (window.confirm("Excluir este produto?")) {
            await fetch(`${API_PRODUTOS}/${id}`, { method: "DELETE" });
            carregarDados();
        }
    };

    const limparFormProduto = () => {
        setIdEditando(null);
        setTitulo(""); setPreco(""); setImagem(""); setLinkAfiliado(""); setCategoria("Maquetes");
    };

    // --- LÓGICA DE NOTÍCIAS ---
    const handleSubmitNoticia = async (e: React.FormEvent) => {
        e.preventDefault();
        const noticiaDados = { 
            titulo: noticiaTitulo, 
            subtitulo: noticiaSub, 
            imagem: noticiaImg, 
            conteudo: noticiaConteudo, 
            categoria: "UESM" 
        };
        
        const metodo = idNoticiaEditando ? "PUT" : "POST";
        const url = idNoticiaEditando ? `${API_NOTICIAS}/${idNoticiaEditando}` : API_NOTICIAS;

        try {
            const response = await fetch(url, {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noticiaDados),
            });

            if (response.ok) {
                setStatus({ tipo: "success", mensagem: "Notícia UESM atualizada com sucesso! 🏆" });
                limparFormNoticia();
                carregarDados();
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro na conexão com o servidor." });
        }
    };

    const prepararEdicaoNoticia = (n: any) => {
        setIdNoticiaEditando(n._id);
        setNoticiaTitulo(n.titulo);
        setNoticiaSub(n.subtitulo);
        setNoticiaImg(n.imagem);
        setNoticiaConteudo(n.conteudo);
    };

    const excluirNoticia = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
            await fetch(`${API_NOTICIAS}/${id}`, { method: "DELETE" });
            carregarDados();
        }
    };

    const limparFormNoticia = () => {
        setIdNoticiaEditando(null);
        setNoticiaTitulo(""); setNoticiaSub(""); setNoticiaImg(""); setNoticiaConteudo("");
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#006400' }}>
                PAINEL ADMINISTRATIVO UESM
            </h2>
            
            {status.mensagem && <Alert variant={status.tipo} dismissible onClose={() => setStatus({tipo:'', mensagem:''})}>
                {status.mensagem}
            </Alert>}

            <Tabs defaultActiveKey="noticias" className="mb-4 custom-tabs">
                {/* ABA DE NOTÍCIAS */}
                <Tab eventKey="noticias" title="📰 Gerenciar Notícias">
                    <Card className="shadow-sm p-4 mb-4 border-0 text-dark">
                        <h4 className="mb-3">{idNoticiaEditando ? "🔄 Editar Notícia" : "🆕 Nova Notícia"}</h4>
                        <Form onSubmit={handleSubmitNoticia}>
                            <Form.Group className="mb-2">
                                <Form.Label>Título</Form.Label>
                                <Form.Control value={noticiaTitulo} onChange={e => setNoticiaTitulo(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Subtítulo</Form.Label>
                                <Form.Control value={noticiaSub} onChange={e => setNoticiaSub(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>URL da Imagem</Form.Label>
                                <Form.Control value={noticiaImg} onChange={e => setNoticiaImg(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Conteúdo da Notícia</Form.Label>
                                <Form.Control as="textarea" rows={4} value={noticiaConteudo} onChange={e => setNoticiaConteudo(e.target.value)} required />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 fw-bold">
                                {idNoticiaEditando ? "SALVAR ALTERAÇÕES" : "PUBLICAR NOTÍCIA"}
                            </Button>
                            {idNoticiaEditando && (
                                <Button variant="link" onClick={limparFormNoticia} className="w-100 mt-2 text-muted">
                                    Cancelar Edição
                                </Button>
                            )}
                        </Form>
                    </Card>

                    <Card className="shadow-sm p-4 border-0 text-dark">
                        <h5 className="mb-3">Lista de Notícias</h5>
                        <Table hover responsive>
                            <thead className="table-dark">
                                <tr>
                                    <th>Título</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {noticiasUesm.map(n => (
                                    <tr key={n._id}>
                                        <td className="small">{n.titulo}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button variant="outline-primary" size="sm" onClick={() => prepararEdicaoNoticia(n)}>Editar</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => excluirNoticia(n._id)}>Excluir</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Tab>

                {/* ABA DE PRODUTOS */}
                <Tab eventKey="produtos" title="📦 Gerenciar Produtos">
                    <Card className="shadow-sm p-4 mb-4 border-0 text-dark">
                        <h4 className="mb-3">{idEditando ? "🔄 Editar Produto" : "🆕 Novo Produto"}</h4>
                        <Form onSubmit={handleSubmitProduto}>
                            <Form.Group className="mb-2">
                                <Form.Label>Nome do Item</Form.Label>
                                <Form.Control value={titulo} onChange={e => setTitulo(e.target.value)} required />
                            </Form.Group>
                            <div className="d-flex gap-2">
                                <Form.Group className="mb-2 w-50">
                                    <Form.Label>Preço (R$)</Form.Label>
                                    <Form.Control value={preco} onChange={e => setPreco(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-2 w-50">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)}>
                                        <option value="Maquetes">Maquetes</option>
                                        <option value="Missangas">Missangas</option>
                                        <option value="Casa">Casa</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <Form.Group className="mb-2">
                                <Form.Label>URL da Imagem</Form.Label>
                                <Form.Control value={imagem} onChange={e => setImagem(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Link Mercado Livre (Afiliado)</Form.Label>
                                <Form.Control value={linkAfiliado} onChange={e => setLinkAfiliado(e.target.value)} required />
                            </Form.Group>
                            <Button variant="success" type="submit" className="w-100 fw-bold">
                                {idEditando ? "SALVAR ALTERAÇÕES" : "CADASTRAR NO BANCO"}
                            </Button>
                            {idEditando && (
                                <Button variant="link" onClick={limparFormProduto} className="w-100 mt-2 text-muted">
                                    Cancelar Edição
                                </Button>
                            )}
                        </Form>
                    </Card>

                    <Card className="shadow-sm p-4 border-0 text-dark">
                        <h5 className="mb-3">Gerenciar Produtos Atuais</h5>
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
                                            <div className="d-flex gap-2">
                                                <Button variant="outline-primary" size="sm" onClick={() => prepararEdicaoProduto(p)}>Editar</Button>
                                                <Button variant="outline-danger" size="sm" onClick={() => excluirProduto(p._id)}>Excluir</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
}