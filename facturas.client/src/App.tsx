import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap"
import TablaFolio from "./components/TablaFolio.jsx";
function App() {
    
    const [factura, setFactura] = useState([]);

    const mostrarFactura = async () => {
        const response = await fetch("http://localhost:5243/api/Factura/Lista", {
            method: 'GET',
            mode: 'no-cors'
        })

        if (response.ok) {
            const data = await response.json();
            setFactura(data);   

        }
        else {
            console.log("error busqueda")
        }
    }

    useEffect(() => {
        mostrarFactura()
    },[])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Facturas</h5>

                        </CardHeader>
                        <CardBody>
                            
                            <hr></hr>
                            <TablaFolio data={factura}></TablaFolio>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
           
        </Container>
    );

   
}

export default App;