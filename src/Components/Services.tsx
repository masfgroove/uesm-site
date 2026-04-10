import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faVideo, 
  faPaintBrush, 
  faNewspaper, 
  faTrophy, 
  faMusic, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";
import { default as JsonData } from "../data/data.json";

export function Services() {
  return (
    <div id='services' className='text-center'>
      <Container>
        <div className='section-title'>
          <h2>Nossos Serviços</h2>
          <p>
            Explora o que a UESM oferece para o universo do Carnaval de Maquete.
          </p>
        </div>
        <Row>
          {JsonData ? JsonData.Services.map((d, i) => (
            <Col md={4} key={`${d.name}-${i}`}>
              {/* Lógica de renderização dos ícones baseada no JSON */}
              <div className="service-icon-container" style={{fontSize: '42px', marginBottom: '20px'}}>
                {d.icon === 'faVideo' && <FontAwesomeIcon icon={faVideo} />}
                {d.icon === 'faPaintBrush' && <FontAwesomeIcon icon={faPaintBrush} />}
                {d.icon === 'faNewspaper' && <FontAwesomeIcon icon={faNewspaper} />}
                {d.icon === 'faTrophy' && <FontAwesomeIcon icon={faTrophy} />}
                {d.icon === 'faMusic' && <FontAwesomeIcon icon={faMusic} />}
                {d.icon === 'faUsers' && <FontAwesomeIcon icon={faUsers} />}
              </div>

              <div className='service-desc'>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </Col>
          )) : 'loading'}
        </Row>
      </Container>
    </div>
  );
}