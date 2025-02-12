import React from 'react';
import { Table } from "reactstrap";

interface TablaFolioProps {
    data: {
        idFolio: number;
        idClienteNavigation: { nombre: string };
        cantidad: number;
        total: number;
        fechaRegistro: string;
    }[];
}

const TablaFolio: React.FC<TablaFolioProps> = ({ data }) => {

    
    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES'); 
    };

    
    const formatFolio = (folio: number) => {
        return folio.toString().padStart(4, '0'); 
    };

    return (
        
            <Table striped responsive className="text-center">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Folio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Fecha Registro</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.length < 1 ? (
                        <tr>
                            <td colSpan={5}>Sin Registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.idFolio}>
                                <td>{item.idClienteNavigation.nombre}</td>
                                <td>{formatFolio(item.idFolio)}</td>
                                <td>${item.cantidad}</td>
                                <td>${item.total}</td>
                                <td>{formatFecha(item.fechaRegistro)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
       
    );
}

export default TablaFolio;
