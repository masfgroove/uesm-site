import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComment,
  faBullhorn,
  faGroupArrowsRotate,
  faMagic,
  faTrophy,
  faShoppingCart,
  faVideo,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

import { default as JsonData } from "../data/data.json";

export function Features() {

  return (
    <div id="features" className='text-center'>
      <Container>
        <Row>

          <Col md={{ span: 10, offset: 1 }} className="section-title">
            <br />
            <br />
            <br />
            <h2>UESM - União das Escolas de Samba de Maquete</h2>
          </Col>

          {JsonData
            ? JsonData.Features.map((d, i) => (
              <Col xs={6} md={3} key={`${d.title}-${i}`}>

                {/* ÍCONES */}
                {d.icon == 'faComment' && <FontAwesomeIcon icon={faComment} size="3x" />}
                {d.icon == 'faBullhorn' && <FontAwesomeIcon icon={faBullhorn} size="3x" />}
                {d.icon == 'faGroupArrowsRotate' && <FontAwesomeIcon icon={faGroupArrowsRotate} size="3x" />}
                {d.icon == 'faMagic' && <FontAwesomeIcon icon={faMagic} size="3x" />}

                {d.icon == 'faTrophy' && <FontAwesomeIcon icon={faTrophy} size="3x" />}
                {d.icon == 'faShoppingCart' && <FontAwesomeIcon icon={faShoppingCart} size="3x" />}
                {d.icon == 'faVideo' && <FontAwesomeIcon icon={faVideo} size="3x" />}
                {d.icon == 'faNewspaper' && <FontAwesomeIcon icon={faNewspaper} size="3x" />}

                <h3 style={{ marginTop: "15px" }}>{d.title}</h3>
                <p>{d.text}</p>

              </Col>
            ))
            : 'Loading...'}
        </Row>
      </Container>
    </div>
  );
}