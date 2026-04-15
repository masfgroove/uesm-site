import './App.css';
import { Navigation } from './Components/Navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes da Home
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Contact } from './Components/Contact';
import { Features } from './Components/Features';
import { Gallery } from './Components/Gallery';
import { Mercado } from './Components/Mercados';
import { Services } from './Components/Services';
import { Noticias } from './Components/Noticias'; 
import { AdminMercado } from "./Components/AdminMercado";

function App() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [totalAcessos, setTotalAcessos] = useState<number>(0);

  useEffect(() => {
    // 1. BUSCA EVENTOS
    fetch('https://render-backend-sl5b.onrender.com/eventos') 
      .then(res => res.json())
      .then(dados => setEventos(dados))
      .catch(err => console.error("Erro na API (Eventos):", err));

    // 2. BUSCA ACESSOS
    fetch('https://render-backend-sl5b.onrender.com/ver-acessos')
      .then(res => res.json())
      .then(dados => {
        if (Array.isArray(dados)) setTotalAcessos(dados.length);
      });

    // 3. REGISTRA ACESSO
    const registrarAcesso = async () => {
      try {
        const resIp = await fetch("https://api.ipify.org?format=json");
        const dataIp = await resIp.json();
        await fetch('https://render-backend-sl5b.onrender.com/acessos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ip: dataIp.ip, 
            data: new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }),
            navegador: navigator.userAgent 
          })
        });
      } catch (err) { console.error(err); }
    };
    registrarAcesso();
  }, []);

  return (
    <Router>
      <Navigation />
      
      <Routes>
        {/* ROTA PÚBLICA: Home completa */}
        <Route path="/" element={
          <div>
            <Home />
            
            <div className="container mt-4 text-center">
              <div className="p-2 d-inline-block shadow-sm rounded bg-light border">
                <span className="text-dark fw-bold">
                  🌎 Total de visitas no portal: <span className="text-danger">{totalAcessos}</span>
                </span>
              </div>
            </div>

            <div className="container mt-5 mb-5 text-center">
              <h2 className="mb-4">🥁 Escolas de Samba de Maquete (UESM)</h2>
              <div className="row justify-content-center">
                {eventos.map((ev) => (
                  <div key={ev._id} className="col-md-5 card m-2 p-4 shadow border-warning">
                    <h3 className="text-danger">{ev.escola}</h3>
                    <h5 className="text-dark">{ev.nome}</h5>
                    <p className="badge bg-primary">Ano: {ev.ano}</p>
                  </div>
                ))}
              </div>
            </div>

            <Noticias />
            <Features />
            <Services />
            <About />
            <Gallery />
            <Mercado />
            <Contact acessos={totalAcessos} />
          </div>
        } />

        {/* NOVA ROTA: Página exclusiva de Notícias */}
        <Route path="/noticias-uesm" element={
          <div className="py-5 bg-light min-vh-100">
            <Noticias />
            <div className="text-center mt-5">
              <a href="/" className="btn btn-outline-primary">← Voltar para o Início</a>
            </div>
          </div>
        } />

        {/* ROTA PRIVADA: Painel Administrativo */}
        <Route path="/painel-uesm" element={
          <div className="py-5 bg-dark min-vh-100">
            <AdminMercado />
            <div className="text-center mt-3">
              <a href="/" className="text-white">← Voltar para o Site</a>
            </div>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;