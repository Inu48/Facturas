import React from 'react';
import { Table } from "reactstrap"

const TablaFolio = ({data }) => {
    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Folio</th>
                    <th>Cantidad</th>
                    <th>Fecha Registro</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr><td colSpan="4">Sin Registros</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idFolio}>
                                <td>{item.idClienteNavigation.nombre}</td>
                                <td>{item.idFolio}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.fechaRegistro}</td>
                                
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    );
}

export default TablaFolio;