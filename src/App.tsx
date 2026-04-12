import './App.css';
import { Navigation } from './Components/Navigation';
import { default as JsonData } from "./data/data.json";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes da Home
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Contact } from './Components/Contact';
import { Features } from './Components/Features';
import { Gallery } from './Components/Gallery';
import { Mercado } from './Components/Mercados';
import { Services } from './Components/Services';
import { Noticias } from './Components/Noticias'; 

function App() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [totalAcessos, setTotalAcessos] = useState<number>(0); // Estado para o contador

  useEffect(() => {
    // 1. BUSCA EVENTOS DAS ESCOLAS
    fetch('https://render-backend-sl5b.onrender.com/eventos') 
      .then(res => res.json())
      .then(dados => setEventos(dados))
      .catch(err => console.error("Erro na API do Render (Eventos):", err));

    // 2. BUSCA QUANTIDADE DE ACESSOS NO BANCO
    fetch('https://render-backend-sl5b.onrender.com/ver-acessos')
      .then(res => res.json())
      .then(dados => {
        if (Array.isArray(dados)) {
          setTotalAcessos(dados.length);
        }
      })
      .catch(err => console.error("Erro ao buscar contagem de acessos:", err));

    // 3. CAPTURA IP E REGISTRA O NOVO ACESSO
    const registrarAcesso = async () => {
      try {
        const resIp = await fetch("https://api.ipify.org?format=json");
        const dataIp = await resIp.json();
        const userIP = dataIp.ip;

        const dataLocal = new Date().toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" });

        await fetch('https://render-backend-sl5b.onrender.com/acessos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            ip: userIP, 
            data: dataLocal,
            navegador: navigator.userAgent 
          })
        });
        
        console.log("Seu acesso foi registrado!");
      } catch (err) {
        console.error("Erro ao registrar acesso:", err);
      }
    };

    registrarAcesso();
  }, []);

  return (
    <div>
      <Navigation />
      <Home />

      {/* --- CONTADOR DE VISITAS --- */}
      <div className="container mt-4 text-center">
        <div className="p-2 d-inline-block shadow-sm rounded bg-light border">
          <span className="text-dark fw-bold">
            🌎 Total de visitas no portal: <span className="text-danger">{totalAcessos}</span>
          </span>
        </div>
      </div>

      {/* Seção Escolas de Samba */}
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
      {/* ADICIONE A PROP ACESSOS AQUI EMBAIXO */}
      <Contact acessos={totalAcessos} />
      
    </div>
  );
}

export default App;