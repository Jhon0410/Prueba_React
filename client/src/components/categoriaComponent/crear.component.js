import axios from 'axios';
import React, { Component } from 'react';
import { api } from '../../settings/configuracion';

export default class CategoriaEditComponent extends Component {
    constructor(){
        super();

        this.state = {
            nombre: '',          
            catUsuario:''
        }
    }
    onChangeNombre = (e) =>{
        this.setState({nombre: e.target.value})
    }
    onChangecatUsuario = (e) =>{
        this.setState({catUsuario: e.target.value})
    }
   

    onSubmit = (e) =>{
        e.preventDefault();
        let url = api + 'categoria/crear';
        let categoria = {
            nombre: this.state.nombre,
            usuario:this.state.catUsuario
        }
        axios.post(url, {categoria}).then(
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
                        <label htmlFor="nombre">Nombre Categoria</label>
                        <input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" onChange={this.onChangeNombre} />
                        <small id="nombreHelp" className="form-text text-muted">Ingrese el nombre de la categoria</small>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="txtcatUsuario">usuario </label>
                        <input type="number" className="form-control" id="txtcatUsuario" aria-describedby="catUsuarioHelp" onChange={this.onChangecatUsuario} />
                        <small id="catUsuarioHelp" className="form-text text-muted">Ingrese su usuario</small>
                    </div>
                   
                    
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        );
    }
}
