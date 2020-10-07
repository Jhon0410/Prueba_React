import axios from 'axios';
import React, { Component } from 'react';
import { api } from '../../settings/configuracion';

export default class UsuarioEditComponent extends Component {
    constructor(){
        super();

        this.state = {
            nombre: '',
            correo: '',
            telefono: '',
            password:''
        }
    }
    onChangeNombre = (e) =>{
        this.setState({nombre: e.target.value})
    }
    onChangeCorreo = (e) =>{
        this.setState({correo: e.target.value})
    }
    onChangeTelefono = (e) =>{
        this.setState({telefono: e.target.value})
    }
    onChangePassword = (e) =>{
        this.setState({password: e.target.value})
    }

    onSubmit = (e) =>{
        e.preventDefault();
        let url = api + 'usuario/crear';
        let usuario = {
            nombre: this.state.nombre,
            correo: this.state.correo,
            telefono:this.state.telefono,
            password:this.state.password
        }
        axios.post(url, {usuario}).then(
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
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" onChange={this.onChangeNombre} />
                        <small id="nombreHelp" className="form-text text-muted">Ingrese el nombre completp</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtCorreo">Correo</label>
                        <input type="email" className="form-control" id="txtCorreo" aria-describedby="correoHelp" onChange={this.onChangeCorreo} />
                        <small id="correoHelp" className="form-text text-muted">Ingrese su correo eléctronico</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtTelefono">Teléfono</label>
                        <input type="text" className="form-control" id="txtTelefono" aria-describedby="telefonoHelp" onChange={this.onChangeTelefono} />
                        <small id="telefonoHelp" className="form-text text-muted">Ingrese su numero de telefono</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="txtPassword" onChange={this.onChangePassword}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        );
    }
}
