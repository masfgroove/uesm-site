import './App.css';
import { Navigation } from './Components/Navigation';
import { default as JsonData } from "./data/data.json";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components/Home';
import { About } from './Components/About';
import { Contact } from './Components/Contact';
import { Features } from './Components/Features';
import { Gallery } from './Components/Gallery';
import { Services } from './Components/Services';

function App() {
  const [pageData, setPageData] = useState<any>({});
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    setPageData(JsonData);

    // Agora apontando para a internet (Render)
    fetch('https://render-backend-sl5b.onrender.com/eventos') 
      .then(res => res.json())
      .then(dados => {
        setEventos(dados);
        console.log("Eventos carregados do Render:", dados);
      })
      .catch(err => console.error("Erro na API do Render:", err));
  }, []);

  return (
    <div>
      <Navigation />
      <Home />

      <div className="container mt-5 mb-5 text-center">
        <h2 className="mb-4">🥁 Escolas de Samba de Maquete (UESM)</h2>
        <div className="row justify-content-center">
          {eventos.length > 0 ? (
            eventos.map((ev) => (
              // Trocamos ev.id por ev._id porque o MongoDB usa o underline
              <div key={ev._id} className="col-md-5 card m-2 p-4 shadow border-warning">
                <h3 className="text-danger">{ev.escola}</h3>
                <h5 className="text-dark">{ev.nome}</h5>
                <p className="badge bg-primary">Ano: {ev.ano}</p>
                <p className="text-muted small">Dados vindos do MongoDB Atlas ✅</p>
              </div>
            ))
          ) : (
            <div className="alert alert-info">Buscando desfiles no banco de dados...</div>
          )}
        </div>
      </div>

      <Features />
      <Services />
      <About />
      <Gallery />
      <Contact />
    </div>
  );
}

export default App;