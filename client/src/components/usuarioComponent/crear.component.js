import axios from 'axios';
import React, { Component } from 'react';
import { api } from '../../settings/configuracion';
//import validator from '../utils/validaciones.utils';

export default class UsuarioEditComponent extends Component {

    constructor() {
        super();
        const validator = require('../utils/validaciones.utils');
        this.state = {
            idUsuario: 0,
            nombre: '',
            correo: '',
            telefono: '',
            password: '',
            validator: validator,
            isSaving: false,
            error: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id !== undefined) {
            this.setState({ idUsuario: parseInt(id) }, () => {
                if (this.state.idUsuario > 0) {
                    this.cargarUsuario(this.state.idUsuario);
                }
            });
        }
    }

    cargarUsuario = (id) => {
        console.log()
        let url = api + 'usuario/porid/' + id
        axios.get(url).then(
            res =>{
                let usuario = res.data
                if(usuario){
                    this.setState({ ...this.state, nombre: usuario.nombre, correo: usuario.correo, telefono: usuario.telefono, password: usuario.password });
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    onChangeNombre = (e) => {
        this.setState({ nombre: e.target.value })
    }
    onChangeCorreo = (e) => {
        this.setState({ correo: e.target.value })
    }
    onChangeTelefono = (e) => {
        this.setState({ telefono: e.target.value })
    }
    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleBlur = evt => {
        const { type, value, name } = evt.target;
        this.updateValidaciones(name, type, value)
    }

    updateValidaciones = (name, type, value) => {
        console.log(name, type, value);
        var error = null;
        if (type === 'text') {
            error = this.state.validator.validacionSoloLetras(name, value);
        } else if (type === 'email') {
            error = this.state.validator.validacionEmail(name, value);
        } else if (type === 'password') {
            error = this.state.validator.validacionLogitudMinima(name, value, 6);
        }
        if (error) {
            this.setState({ error: { ...this.state.error, [name]: error } });
        } else {
            let error = this.state.error;
            delete error[name];
            this.setState({ error: error });
        }
    }

    reset = () => {
        this.setState({ ...this.state, nombre: '', correo: '', telefono: '', password: '', err: {} });
    }

    isValid = async () => {
        await this.updateValidaciones("nombre", 'text', this.state.nombre);
        await this.updateValidaciones("correo", 'email', this.state.correo);
        await this.updateValidaciones("telefono", 'text', this.state.telefono);
        await this.updateValidaciones("password", 'password', this.state.password);
        return this.state.nombre !== '' && this.state.correo !== '' && this.state.telefono !== '' && this.state.password !== '';
    }

    isValidForm = () => {

        const isValid = this.isValid() && !this.state.validator.hasError(this.state.error);
        return isValid;
    }

    onSubmit = (e) => {

        e.preventDefault();
        this.setState({ isSaving: true }, () => {
            let isValid = this.isValidForm();
            if (isValid) {
                var url =  '';
                let usuario = {
                    id: this.state.idUsuario,
                    nombre: this.state.nombre,
                    correo: this.state.correo,
                    telefono: this.state.telefono,
                    password: this.state.password
                }

                if(this.state.idUsuario > 0){
                    url = api + 'usuario/actualizar';
                    axios.put(url, { usuario }).then(
                        res => {
                            this.setState({ isSaving: false });
    
                            let success = res.data.success;
                            let msg = res.data.msg;
    
                            if (success) {
                                alert(msg);
                                this.props.history.push(`/usuario`);
                            } else {
                                alert(msg);
                            }
                        }
                    ).catch(
                        err => {
                            this.setState({ isSaving: false });
                            console.log(err);
                        }
                    );
                }else{
                    url = api + 'usuario/crear';
                    axios.post(url, { usuario }).then(
                        res => {
                            this.setState({ isSaving: false });
    
                            let success = res.data.success;
                            let msg = res.data.msg;
    
                            if (success) {
                                this.reset();
                                alert(msg);
                                this.props.history.push(`/login`);
                            } else {
                                alert(msg);
                            }
                        }
                    ).catch(
                        err => {
                            this.setState({ isSaving: false });
                            console.log(err);
                        }
                    );
                }
            } else {
                this.setState({ isSaving: false });
                alert('por favor complete los campos requeridos');
            }
        });

    }

    titulo = () => {
        if (this.state.idUsuario > 0) {
            return 'Editar usuario';
        } else {
            return 'Registrarse';
        }
    }

    btnTitulo = () => {
        if (this.state.idUsuario > 0) {
            return 'Guardar';
        } else {
            return 'Registrarse';
        }
    }

    render() {
        return (
            <div className="container">
                <div className="nav-item">
                    <h2>{this.titulo()}</h2>
                </div><br />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo *</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre} onBlur={this.handleBlur} onChange={this.onChangeNombre} />
                        <div className="error">
                            {this.state.error.nombre}
                        </div>

                    </div>
                    <div className="form-group">
                        <label htmlFor="txtCorreo">Correo *</label>
                        <input type="email" className="form-control" id="txtCorreo" name="correo" value={this.state.correo} onBlur={this.handleBlur} onChange={this.onChangeCorreo} disabled={this.state.idUsuario>0} />
                        <div className="error">
                            {this.state.error.correo}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtTelefono">Teléfono *</label>
                        <input type="text" className="form-control" id="txtTelefono" name="telefono" value={this.state.telefono} onBlur={this.handleBlur} onChange={this.onChangeTelefono} />
                        <div className="error">
                            {this.state.error.telefono}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtPassword">Password *</label>
                        <input type="password" className="form-control" id="txtPassword" name="password" value={this.state.password} onBlur={this.handleBlur} onChange={this.onChangePassword} disabled={this.state.idUsuario>0}/>
                        <div className="error">
                            {this.state.error.password}
                        </div>
                    </div>
                    {
                        this.state.isSaving
                            ? <button type="button" className="btn btn-secondary">{this.btnTitulo()}</button>
                            : <button type="submit" className="btn btn-primary">{this.btnTitulo()}</button>
                    }

                </form>
            </div>
        );
    }
}
