import React, { Component } from 'react';
import path from '../../settings/configuracion';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class UsuarioComponent extends Component {
    constructor() {
        super();
        this.state = {
            usuarios: [],
        };
    }

    componentDidMount() {
        this.cargarDatos();
    }

    cargarDatos = () => {
        let url = path.api + 'usuario/todos';
        axios.get(url).then(
            res => {
                this.setState({ usuarios: res.data });
            }
        ).catch(
            err => {
                console.log("ocurrio un error")
            }
        );
    }

    editarUsuario = (id) => {
        console.log('aca' + id);
        let path = "usuario/editar/" + id;
        this.props.history.push(path);
    }

    eliminarUsuario = (id) => {
        console.log('usuario a eliminar' + id);
        let confirm = window.confirm("¿Esta seguro de eliminar el registro");
        if (confirm) {
            let url = path.api + 'usuario/eliminar/' + id;
            axios.delete(url).then(
                res => {
                    const success = res.data.success;
                    const msg = res.data.msg;
                    if (success) {
                        this.cargarDatos();
                        alert(msg)
                    }
                }
            ).catch(
                err => {
                    console.log("ocurrio un error")
                }
            );
        }

    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre de usuario</th>
                                <th scope="col">Correo electonico</th>
                                <th scope="col">teléfono</th>
                                <th scope="col" style={{ textAlign: "center" }} colSpan="2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>

                                            <button type="button" className="btn btn-primary" onClick={() => { this.editarUsuario(usuario.id) }}>
                                                Editar
                                             </button>
                                        </td>
                                        <td>
                                            {usuario.totalCategorias === 0
                                                ? <button type="button" className="btn btn-danger" onClick={() => { this.eliminarUsuario(usuario.id) }}>
                                                    eliminar
                                         </button>
                                                : ''
                                            }

                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>

                </div>
                <div className="row">
                    <Link className="btn btn-primary" to="/usuario/editar/0">
                        Nuevo
                    </Link>

                </div>
            </div>
        );
    }
}
