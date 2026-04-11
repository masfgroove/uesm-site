import { Navbar, Nav, Container } from 'react-bootstrap';
import JsonData from "../data/data.json";
import { useState, useEffect } from "react";

export function Navigation() {
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        setPageData(JsonData);
    }, []);

    const linkStyle = { 
        fontWeight: 'bold', 
        color: '#333333', 
        textTransform: 'uppercase' as 'uppercase',
        fontSize: '13px',
        marginRight: '10px'
    };

    return (
        <div>
            <Navbar collapseOnSelect fixed='top' expand='sm' className='navbar-default'>
                <Container>
                    <Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src="img/logo_uesm.png"
                        alt="Logo UESM"
                        style={{ height: '45px', width: 'auto' }}
                      />
                    </Navbar.Brand>
                    <Navbar.Toggle className='navbar-toggle' aria-controls='responsive-navbar-nav' />

                    <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
                        <Nav defaultActiveKey="/" as="ul">
                            <Nav.Item>
                                <Nav.Link href="#home" className="nav-links" style={linkStyle}>🏠 Home</Nav.Link>
                            </Nav.Item>
                            
                            {/* ADICIONADO: LINK PARA NOTÍCIAS */}
                            <Nav.Item>
                                <Nav.Link href="#noticias" className="nav-links" style={{...linkStyle, color: '#d35400'}}>📰 Notícias</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href="#features" className="nav-links" style={linkStyle}>✨ Explore</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#services" className="nav-links" style={linkStyle}>🛠️ Serviços</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='#about' className="nav-links" style={linkStyle}>📖 Sobre</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href='#portfolio' className="nav-links" style={linkStyle}>🖼️ Galeria</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href='#mercado' className="nav-links" style={{ fontWeight: 'bold', color: '#f39c12', textTransform: 'uppercase', fontSize: '13px' }}>
                                    Mercado 🛒
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link href="#contact" className="nav-links" style={linkStyle}>📞 Contato</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}