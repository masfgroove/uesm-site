import { Container, Row, Col } from 'react-bootstrap';
import { Image } from "./Image";
import { default as JsonData } from "../data/data.json";

export function Mercado() {
    return (
        <div id='mercado' className='text-center'>
            <Container>
                <div className='section-title'>
                    <h2>Mercado da Maquete</h2>
                    <p>
                        Confira os produtos e materiais exclusivos das nossas escolas 
                        de samba de maquete.
                    </p>
                </div>

                <div className='portfolio-items'>
                    <Row>
                        {JsonData && JsonData.Mercado ? (
                            JsonData.Mercado.map((d, i) => (
                                <Col sm={6} lg md={4} key={`${d.title}-${i}`}>
                                    <Image  
                                        title={d.title} 
                                        largeImage={d.largeImage} 
                                        smallImage={d.smallImage} 
                                    />
                                </Col>
                            ))
                        ) : (
                            'Carregando produtos...'
                        )}
                    </Row>
                </div>
            </Container>
        </div>
    );
}