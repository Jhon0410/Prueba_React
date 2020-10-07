import React, { Component } from 'react';
import path from '../../settings/configuracion';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class ProductoComponent extends Component {
    constructor() {
        super();
        this.state = {
            producto: [],
        };
    }

    async componentDidMount() {
        let url = path.api + 'producto/todos';
        const response = await axios.get(url);
        this.setState({ producto: response.data });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre de producto</th>
                                <th scope="col">Precio producto</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Categoria</th>
                                <th scope="col" colSpan="2">opciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.producto.map(producto => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.categoriaid}</td>
                                        <td>
                                            <b>Editar</b>
                                        </td>
                                        <td>
                                            <b>eliminar</b>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>

                </div>
                <div className="row">
                    <Link className = "btn btn-primary" to="/producto/editar/:id">
                        Nuevo
                    </Link>
                    
                </div>
            </div>
        );
    }
}
