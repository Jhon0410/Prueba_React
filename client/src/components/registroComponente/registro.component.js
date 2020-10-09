import React, { Component } from 'react';
import { api } from '../../settings/configuracion';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class RegistroComponent extends Component {
    constructor() {
        super();
        this.state = {
            correo: '',
            password:'',

        };
    }

    async componentDidMount() {
        const storage = require('../../settings/storage');
        let isLogin = await storage.isLogin();
        this.setState({isLogin: isLogin});
    }

    onChangeCorreo = (e) =>{
        this.setState({correo: e.target.value})
    }

    onChangePassword = (e) =>{
        this.setState({password: e.target.value})
    }
    
    login = (e) => {
        e.preventDefault();
        const storage = require('../../settings/storage');
        let url = api + 'usuario/login';
        let usuario = {
            correo: this.state.correo,
            password: this.state.password
        }

        axios.post(url, {usuario}).then(
            res => {
                let success = res.data.success;
                let data = res.data.data;
                if (success){
                    //login
                    storage.login(data.id);
                    console.log('el usario se ha logueado');
                    this.setState({isLogin:true})
                    window.location.reload();
                }else{
                    alert(data);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        );

    }


    render() {
        if(this.state.isLogin){
            return <Redirect to="/home"/>
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6" style={{margin:'auto'}}>
                        <form onSubmit={this.login}>
                           
                            <div className="form-group">
                                <label htmlFor="txtCorreo">Correo</label>
                                <input type="email" className="form-control" id="txtCorreo" aria-describedby="correoHelp" onChange={this.onChangeCorreo} />
                                <small id="correoHelp" className="form-text text-muted">Ingrese su correo eléctronico</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="txtPassword">Password</label>
                                <input type="password" className="form-control" id="txtPassword" onChange={this.onChangePassword} />
                            </div>

                            <button type="submit" className="btn btn-danger">Ingresar</button>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}
