import React from "react";
import { Container } from "react-bootstrap";
import { Noticias } from "./Noticias"; // Importando o componente que você criou

export function PaginaNoticias() {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Container className="py-5">
            <h1 className="text-center mb-2" style={{ color: '#006400', fontWeight: 'bold' }}>
                PORTAL DE NOTÍCIAS UESM
            </h1>
            <p className="text-center text-muted mb-5">As últimas novidades do mundo do samba</p>
            
            {/* Chamando o componente sem limite para mostrar todas as notícias do feed */}
            <Noticias /> 
            
            <div className="text-center mt-5">
                <a href="/" className="btn btn-success fw-bold px-4">
                    ← VOLTAR PARA O PORTAL UESM
                </a>
            </div>
        </Container>
    </div>
  );
}