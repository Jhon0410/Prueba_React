import axios from 'axios';
import React, { Component } from 'react';
import { api } from '../../settings/configuracion';

export default class ProductoEditComponent extends Component {
    constructor(){
        super();

        this.state = {
            nombre: '',
            precio: '',
            stock: '',
            categoriaid:''
        }
    }
    onChangeNombre = (e) =>{
        this.setState({nombre: e.target.value})
    }
    onChangeprecio = (e) =>{
        this.setState({precio: e.target.value})
    }
    onChangestock = (e) =>{
        this.setState({stock: e.target.value})
    }
    onChangecategoriaid = (e) =>{
        this.setState({categoriaid: e.target.value})
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let url = api + 'producto/crear';
        let producto = {
            nombre: this.state.nombre,
            precio: this.state.precio,
            stock:this.state.stock,
            categoria:this.state.categoriaid
        }
        axios.post(url, {producto}).then(
            res => {
                console.log(res);
                let success = res.data.success;
                let msg = res.data.msg;
                if(success){
                    alert(msg);
                }else{
                    alert(msg);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    render() {
        return (
            <div className="container">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre producto</label>
                        <input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" onChange={this.onChangeNombre} />
                        <small id="nombreHelp" className="form-text text-muted">Ingrese el nombre del producto</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtprecio">Precio</label>
                        <input type="real" className="form-control" id="txtprecio" aria-describedby="precioHelp" onChange={this.onChangeprecio} />
                        <small id="precioHelp" className="form-text text-muted">Ingrese precio</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtstock">Stock</label>
                        <input type="text" className="form-control" id="txtstock" aria-describedby="stockHelp" onChange={this.onChangestock} />
                        <small id="stockHelp" className="form-text text-muted">Ingrese stock</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtcategoriaid">Categoria</label>
                        <input type="number" className="form-control" id="txtcategoriaid" aria-describedby="categoriaidHelp" onChange={this.onChangecategoriaid} />
                        <small id="categoriaidHelp" className="form-text text-muted">Ingrese stock</small>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        );
    }
}
