import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

export function AdminMercado() {
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [form, setForm] = useState({
        titulo: "",
        preco: "",
        parcelas: "12x sem juros", // Valor padrão inicial
        imagem: "",
        descricao: "",
        linkAfiliado: "",
        categoria: "Acessórios",
        garantia: "Sem garantia"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: 'info', msg: 'Enviando...' });

        try {
            // ATENÇÃO: Usando localhost:3000 para testar no seu PC
            const response = await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setStatus({ type: 'success', msg: '✅ Produto cadastrado no MongoDB!' });
                setForm({ 
                    titulo: "", preco: "", parcelas: "12x sem juros", 
                    imagem: "", descricao: "", linkAfiliado: "", 
                    categoria: "Acessórios", garantia: "Sem garantia" 
                });
            } else {
                setStatus({ type: 'danger', msg: '❌ Erro ao salvar: Verifique o console do VS Code.' });
            }
        } catch (err) {
            console.error(err);
            setStatus({ type: 'danger', msg: '❌ Servidor offline! Ligue o backend (npm start).' });
        }
    };

    return (
        <Container className="py-5" style={{ maxWidth: '600px' }}>
            <h3 className="mb-4 text-center">Cadastrar Novo Produto</h3>
            
            {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}

            <Form onSubmit={handleSubmit} className="bg-light p-4 border rounded shadow-sm">
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Título do Produto</Form.Label>
                    <Form.Control required type="text" placeholder="Ex: Franjas De Seda Tassel" 
                        value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
                </Form.Group>

                <div className="row">
                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label className="fw-bold">Preço (R$)</Form.Label>
                        <Form.Control required type="text" placeholder="46,16" 
                            value={form.preco} onChange={e => setForm({...form, preco: e.target.value})} />
                    </Form.Group>

                    <Form.Group className="col-md-6 mb-3">
                        <Form.Label className="fw-bold">Parcelas</Form.Label>
                        <Form.Control type="text" placeholder="12x R$ 4,50" 
                            value={form.parcelas} onChange={e => setForm({...form, parcelas: e.target.value})} />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">URL da Imagem</Form.Label>
                    <Form.Control required type="text" placeholder="https://..." 
                        value={form.imagem} onChange={e => setForm({...form, imagem: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Link de Afiliado (Mercado Livre)</Form.Label>
                    <Form.Control required type="text" placeholder="https://meli.la/..." 
                        value={form.linkAfiliado} onChange={e => setForm({...form, linkAfiliado: e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Categoria</Form.Label>
                    <Form.Select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Materiais">Materiais</option>
                        <option value="Maquetes">Maquetes</option>
                        <option value="Outros">Outros</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Descrição</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Detalhes do produto..."
                        value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
                    CADASTRAR PRODUTO 🚀
                </Button>
            </Form>
        </Container>
    );
}