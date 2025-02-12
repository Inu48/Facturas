import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface ModalFacturaProps {
    isOpen: boolean;
    toggle: () => void;
    onFacturaGuardada: () => void;
}

interface Cliente {
    idCliente: number;
    nombre: string;
}


const ModalFactura: React.FC<ModalFacturaProps> = ({ isOpen, toggle, onFacturaGuardada }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [idCliente, setIdCliente] = useState('');
    const [fechaRegistro, setFechaRegistro] = useState('');
    const [concepto, setConcepto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        const listaClientes = async () => {
            try {
                const response = await fetch("http://localhost:4416/api/Cliente/Lista");
                if (response.ok) {
                    const data: Cliente[] = await response.json();
                    setClientes(data);
                }
                else {
                    console.log("Error en la búsqueda");
                }
            } catch (error) {
                console.log('Error al obtener la lista de Clientes: ', error);
            }
        };
        listaClientes();
    }, []);

    const handleCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*(\.\d{0,2})?$/.test(value)) {
            setCantidad(value);
            const parsedCantidad = parseFloat(value) || 0;
            setTotal((parsedCantidad * 1.16).toFixed(2));
        }
    };

    const handleConcepto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();

        if (value.length <= 50) {
            setConcepto(value);
        }

    };

    const handleGuardarFactura = async () => {
        if (!idCliente || !fechaRegistro || !concepto || !cantidad) {
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios!!!",

            });
            return;
        }

        const facturaForm = {
            IdCliente: parseInt(idCliente),
            FechaRegistro: fechaRegistro,
            Concepto: concepto,
            Cantidad: parseFloat(cantidad)
        }
        try {
            const response = await fetch("http://localhost:4416/api/Factura/Guardar", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(facturaForm)
            });

            if (!response.ok) {
                throw new Error('Error al guardar la factura');
            }

            withReactContent(Swal).fire({
                icon: "success",
                title: "Operación exitosa",
                text: "La factura se guardo correctamente",

            });
            
            
            toggle();
            onFacturaGuardada();
        } catch (error) {
            console.log('Error al guarda la factura: ', error);
            withReactContent(Swal).fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un problema al guardar la factura",

            });
            
        }

        setIdCliente('');
        setFechaRegistro('');
        setConcepto('');
        setCantidad('');
        setTotal('');

    };

    const handleCancelar = () => {
        toggle();
        setIdCliente('');
        setFechaRegistro('');
        setConcepto('');
        setCantidad('');
        setTotal('');
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Nueva Factura</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Cliente</Label>
                        <Input type="select" value={idCliente} onChange={(e) => setIdCliente(e.target.value)}>
                            <option value="">Seleccione un cliente</option>
                            {clientes.map((cliente) => (
                                <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.nombre}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Fecha Registro</Label>
                        <Input type="date" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Concepto</Label>
                        <Input type="text" value={concepto} onChange={handleConcepto} maxLength={50} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Cantidad</Label>
                        <Input type="text" value={cantidad} onChange={handleCantidad} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Total (+16% IVA)</Label>
                        <Input type="text" value={total} readOnly />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleGuardarFactura}>Guardar</Button>
                <Button color="danger" onClick={handleCancelar}>Cancelar</Button>
            </ModalFooter>
        </Modal>
     );
 };


export default ModalFactura;
