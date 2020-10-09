import React, { Component } from 'react';
import path from '../../settings/configuracion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import storage from '../../settings/storage';
export default class CategoriaComponent extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],
        };
    }

    componentDidMount() {
        this.cargarDatos()
    }

    cargarDatos = () => {
        let usuarioId = storage.usuarioEnSession();
        let url = path.api + 'categoria/todos/' + usuarioId;
        axios.get(url).then(
            res => {
                this.setState({ categorias: res.data });
            }
        ).catch(
            err => {
                console.log("ocurrio un error")
            }
        );
    }


    editarCategoria = (id) => {
        
       let path = "categoria/editar/" + id;
       console.log(this.props.history);
       this.props.history.push(path);
    }

    eliminarCategoria = (id) => {
        console.log('categoria a eliminar' + id);
        let confirm = window.confirm("¿Esta seguro de eliminar el registro");
        if(confirm){
            let url = path.api + 'categoria/eliminar/' + id;
            axios.delete(url).then(
                res => {
                    const success = res.data.success;
                    const msg = res.data.msg;
                    if(success){
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
                                <th scope="col">Nombre de categoria</th>
                                
                                <th scope="col" colSpan="2" style={{textAlign: "center"}}>opciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.categorias.map(categoria => (
                                    <tr key={categoria.id}>
                                        <td>{categoria.nombre}</td>

                                        <td>
                                            <button type="button" className="btn btn-primary" onClick={() => { this.editarCategoria(categoria.id) }}>
                                                Editar
                                             </button>
                                        </td>
                                        <td>
                                            {categoria.totalProductos === 0 
                                            ? <button type="button" className="btn btn-danger" onClick={() => { this.eliminarCategoria(categoria.id) }}>
                                            eliminar
                                            </button>
                                            :''
                                            }
                                            
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>

                </div>
                <div className="row">
                    <Link className="btn btn-primary" to="/categoria/editar/0">
                        Nuevo
                    </Link>

                </div>
            </div>
        );
    }
}
