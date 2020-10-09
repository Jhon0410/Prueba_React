import React, { Component } from 'react';
import path from '../../settings/configuracion';
import axios from 'axios';
import storage from '../../settings/storage';
import { Link } from 'react-router-dom';
export default class ProductoComponent extends Component {
    constructor() {
        super();
        this.state = {
            productos: [],
        };
    }

    async componentDidMount() {
        this.cargarDatos();
    }

    cargarDatos = () => {
        let usuarioId = storage.usuarioEnSession();
        let url = path.api + 'producto/todos/' + usuarioId;
        axios.get(url).then(
            res => {
                this.setState({ productos: res.data });
            }
        ).catch(
            err => {
                console.log("ocurrio un error")
            }
        );
    }

    editarProducto = (id) => {
        
        let path = "producto/editar/" + id;
        this.props.history.push(path);
     }
 
     eliminarProducto = (id) => {
         console.log('producto a eliminar' + id);
         let confirm = window.confirm("¿Esta seguro de eliminar el registro");
         if(confirm){
             let url = path.api + 'producto/eliminar/' + id;
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
                                <th scope="col">Nombre de producto</th>
                                <th scope="col">Precio producto</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Categoria</th>
                                <th scope="col" colSpan="2" style={{ textAlign: "center" }}>opciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.productos.map(producto => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.categoria}</td>
                                        <td>
                                        <button type="button" className="btn btn-primary" onClick={() => { this.editarProducto(producto.id) }}>
                                                Editar
                                             </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => { this.eliminarProducto(producto.id) }}>
                                                eliminar
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>

                </div>
                <div className="row">
                    <Link className="btn btn-primary" to="/producto/editar/0">
                        Nuevo
                    </Link>

                </div>
            </div>
        );
    }
}
