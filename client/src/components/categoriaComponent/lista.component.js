import React, { Component } from 'react';
import path from '../../settings/configuracion';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class CategoriaComponent extends Component {
    constructor() {
        super();
        this.state = {
            categoria: [],
        };
    }

    async componentDidMount() {
        let url = path.api + 'categoria/todos';
        const response = await axios.get(url);
        this.setState({ categoria: response.data });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre de categoria</th>
                                <th scope="col">usuario</th>
                                <th scope="col" colSpan="2">opciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.categoria.map(categoria => (
                                    <tr key={categoria.id}>
                                        <td>{categoria.nombre}</td>
                                        <td>{categoria.catUsuario}</td>
                                        
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
                    <Link className = "btn btn-primary" to="/categoria/editar/:id">
                        Nuevo
                    </Link>
                    
                </div>
            </div>
        );
    }
}
