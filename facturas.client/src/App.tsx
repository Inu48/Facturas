import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormGroup, Label, Input, ButtonGroup } from "reactstrap";
import TablaFolio from "./components/TablaFolio";
import ModalFactura from "./components/ModalFactura";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface Factura {
    idFolio: number;
    idClienteNavigation: {
        nombre: string;
    };
    cantidad: number;
    fechaRegistro: string;
}

function App() {
    const [factura, setFactura] = useState<Factura[]>([]);

    const [fechaInicio, setFechaInicio] = useState<string>('');
    const [fechaFin, setFechaFin] = useState<string>('');

    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);

    const mostrarFactura = async () => {
        try {
            const response = await fetch("http://localhost:4416/api/Factura/Lista");

            if (response.ok) {
                const data: Factura[] = await response.json();
                setFactura(data);
            } else {
                console.log("Error en la búsqueda");
            }
        } catch (error) {
            console.error("Error al obtener facturas:", error);
        }
    };

    useEffect(() => {
        mostrarFactura();
    }, []);

    const handleFechaInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFechaInicio(e.target.value);
    };

    const handleFechaFinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFechaFin(e.target.value);
    };

    const handleFiltrar = async () => {
        if (!fechaInicio || !fechaFin) {
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Te falta agregar otra(s) fecha(a)",
                
            });
            return;
        }

        try {
            
            const response = await fetch(`http://localhost:4416/api/Factura/Filtro?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos.");
            }

            const data = await response.json(); 

            setFactura(data); 
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al obtener los datos.",

            });
            
        }

        setFechaInicio('');
        setFechaFin('');
    };

    const handleReiniciar = () => {
        mostrarFactura();
        
        setFechaInicio(''); 
        setFechaFin('');
    };

    const fetchFacturas = async () => {
        mostrarFactura();
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Facturas</h5>
                        </CardHeader>
                        <CardBody>
                            <hr />
                            
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Fecha Inicio</Label>
                                        <Input
                                            type="date"
                                            value={fechaInicio}
                                            onChange={handleFechaInicioChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Fecha Fin</Label>
                                        <Input
                                            type="date"
                                            value={fechaFin}
                                            onChange={handleFechaFinChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <ButtonGroup>
                                <Button color="primary" onClick={handleFiltrar}>Filtrar</Button>
                                <Button color="secondary" onClick={handleReiniciar}>Reiniciar</Button>
                                <Button color="success" onClick={toggleModal}>Nueva Factura</Button>
                            </ButtonGroup>
                            <hr />
                            <TablaFolio data={factura} />
                            <ModalFactura isOpen={modalOpen} toggle={toggleModal} onFacturaGuardada={fetchFacturas} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
