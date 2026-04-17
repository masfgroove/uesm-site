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

    // --- APIs ---
    const API_PRODUTOS = "http://localhost:3000/produtos";
    const API_NOTICIAS = "http://localhost:3000/noticias-uesm";

    const carregarDados = async () => {
        try {
            const [resProd, resNot] = await Promise.all([
                fetch(API_PRODUTOS),
                fetch(API_NOTICIAS)
            ]);
            const dataProd = await resProd.json();
            const dataNot = await resNot.json();
            setProdutos(dataProd);
            setNoticiasUesm(dataNot);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
        }
    };

    useEffect(() => { carregarDados(); }, []);

    // --- LÓGICA DE PRODUTOS (IGUALADA ÀS NOTÍCIAS) ---
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
                setStatus({ tipo: "success", mensagem: "Produto atualizado com sucesso! 📦" });
                limparFormProduto();
                await carregarDados(); // Aguarda carregar para atualizar a lista
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro na conexão com o servidor." });
        }
    };

  const excluirProduto = async (id: string) => {
        // Teste 1: Ver se o ID existe ao clicar
        console.log("Tentando excluir o produto com ID:", id);

        if (!id) {
            alert("Erro: O ID do produto veio vazio!");
            return;
        }

        if (window.confirm("Deseja realmente excluir este produto?")) {
            try {
                const urlCompleta = `${API_PRODUTOS}/${id}`;
                console.log("Chamando URL:", urlCompleta);

                const response = await fetch(urlCompleta, { 
                    method: "DELETE" 
                });

                console.log("Status da resposta do Servidor:", response.status);

                if (response.ok) {
                    setStatus({ tipo: "success", mensagem: "Produto excluído com sucesso! 🗑️" });
                    console.log("Sucesso! Atualizando lista...");
                    await carregarDados(); 
                } else {
                    const textoErro = await response.text();
                    console.error("O servidor respondeu com erro:", textoErro);
                    setStatus({ tipo: "danger", mensagem: "Erro ao excluir produto no servidor." });
                }
            } catch (err) {
                console.error("Erro catastrófico na conexão:", err);
                setStatus({ tipo: "danger", mensagem: "Erro de conexão ao tentar excluir." });
            }
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

    const limparFormProduto = () => {
        setIdEditando(null);
        setTitulo(""); setPreco(""); setImagem(""); setLinkAfiliado(""); setCategoria("Maquetes");
    };

    // --- LÓGICA DE NOTÍCIAS ---
    const handleSubmitNoticia = async (e: React.FormEvent) => {
        e.preventDefault();
        const noticiaDados = { titulo: noticiaTitulo, subtitulo: noticiaSub, imagem: noticiaImg, conteudo: noticiaConteudo, categoria: "UESM" };
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
                await carregarDados();
            }
        } catch (error) {
            setStatus({ tipo: "danger", mensagem: "Erro na conexão com o servidor." });
        }
    };

    const excluirNoticia = async (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
            try {
                const response = await fetch(`${API_NOTICIAS}/${id}`, { method: "DELETE" });
                if (response.ok) {
                    setStatus({ tipo: "success", mensagem: "Notícia removida!" });
                    await carregarDados();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const prepararEdicaoNoticia = (n: any) => {
        setIdNoticiaEditando(n._id);
        setNoticiaTitulo(n.titulo);
        setNoticiaSub(n.subtitulo);
        setNoticiaImg(n.imagem);
        setNoticiaConteudo(n.conteudo);
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
                {/* ABA NOTÍCIAS */}
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
                        </Form>
                    </Card>
                    <Table hover responsive className="text-dark">
                        <thead className="table-dark"><tr><th>Título</th><th>Ações</th></tr></thead>
                        <tbody>
                            {noticiasUesm.map(n => (
                                <tr key={n._id}>
                                    <td className="small">{n.titulo}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" onClick={() => prepararEdicaoNoticia(n)} className="me-2">Editar</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => excluirNoticia(n._id)}>Excluir</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>

                {/* ABA PRODUTOS */}
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
                        </Form>
                    </Card>
                    <Table hover responsive className="text-dark">
                        <thead className="table-dark"><tr><th>Título</th><th>Categoria</th><th>Ações</th></tr></thead>
                        <tbody>
                            {produtos.map(p => (
                                <tr key={p._id}>
                                    <td className="small">{p.titulo}</td>
                                    <td><span className="badge bg-primary">{p.categoria}</span></td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" onClick={() => prepararEdicaoProduto(p)} className="me-2">Editar</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => excluirProduto(p._id)}>Excluir</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </Container>
    );
}