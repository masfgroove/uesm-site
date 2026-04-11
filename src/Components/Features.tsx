import { useState } from "react";
import { Container, Row, Col, Modal, Ratio } from 'react-bootstrap';
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
  // Estado para controlar a visibilidade do Modal
  const [show, setShow] = useState(false);
  
  // URL do vídeo formatada para embed (obrigatório para funcionar dentro do site)
  const videoUrl = "https://www.youtube.com/embed/5DgoEJ94Rv0";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="features" className='text-center'>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className="section-title">
            <br /><br /><br />
            <h2>UESM - União das Escolas de Samba de Maquete</h2>
          </Col>

          {JsonData
            ? JsonData.Features.map((d, i) => {
                // Verificamos se o item atual é o de vídeo/desfile
                const isVideoItem = d.icon === 'faVideo' || d.title.toLowerCase().includes("desfile");

                return (
                  <Col 
                    xs={6} 
                    md={3} 
                    key={`${d.title}-${i}`}
                    onClick={isVideoItem ? handleShow : undefined}
                    style={{ cursor: isVideoItem ? 'pointer' : 'default' }}
                  >
                    {/* ÍCONES */}
                    {d.icon === 'faComment' && <FontAwesomeIcon icon={faComment} size="3x" />}
                    {d.icon === 'faBullhorn' && <FontAwesomeIcon icon={faBullhorn} size="3x" />}
                    {d.icon === 'faGroupArrowsRotate' && <FontAwesomeIcon icon={faGroupArrowsRotate} size="3x" />}
                    {d.icon === 'faMagic' && <FontAwesomeIcon icon={faMagic} size="3x" />}

                    {d.icon === 'faTrophy' && <FontAwesomeIcon icon={faTrophy} size="3x" />}
                    {d.icon === 'faShoppingCart' && <FontAwesomeIcon icon={faShoppingCart} size="3x" />}
                    {d.icon === 'faVideo' && <FontAwesomeIcon icon={faVideo} size="3x" />}
                    {d.icon === 'faNewspaper' && <FontAwesomeIcon icon={faNewspaper} size="3x" />}

                    <h3 style={{ marginTop: "15px" }}>{d.title}</h3>
                    <p>{d.text}</p>
                  </Col>
                );
              })
            : 'Loading...'}
        </Row>
      </Container>

      {/* DIALOGUE (MODAL) PARA O VÍDEO DO YOUTUBE */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Assista ao Desfile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Ratio aspectRatio="16x9">
            <iframe
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            ></iframe>
          </Ratio>
        </Modal.Body>
      </Modal>
    </div>
  );
}