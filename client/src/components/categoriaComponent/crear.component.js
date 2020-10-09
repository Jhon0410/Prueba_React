import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../settings/configuracion';
import storage from '../../settings/storage';


export default class CategoriaEditComponent extends Component {
    constructor() {
        super();
        const validator = require('../utils/validaciones.utils');
        this.state = {
            id: 0,
            nombre: '',
            codigo: '',
            idUsuario: 0,
            isEditing: false,
            validator: validator,
            error: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log('categoria a editar = ' + id);
        let usuarioId = storage.usuarioEnSession();
        this.setState({ idUsuario: parseInt(usuarioId) });
        if (id !== undefined) {
            this.setState({ id: parseInt(id) }, () => {
                if (this.state.id > 0) {
                    this.setState({ isEditing: true });
                    this.cargarCategoria(this.state.id);
                }
            });
        }
    }

    cargarCategoria = (id) => {
        let url = api + 'categoria/porid/' + id;
        axios.get(url).then(
            res => {
                let categoria = res.data;
                if (categoria) {
                    this.setState({ ...this.state, nombre: categoria.nombre, codigo: categoria.codigo });
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

    onChangeCodigo = (e) => {
        this.setState({ codigo: e.target.value })
    }

    handleBlur = evt => {
        const { type, value, name } = evt.target;
        this.updateValidaciones(name, type, value)
    }

    updateValidaciones = (name, type, value) => {

       var error = this.state.validator.validacionSoloLetras(name, value);

        if (error) {
            this.setState({ error: { ...this.state.error, [name]: error } });
        } else {
            let error = this.state.error;
            delete error[name];
            this.setState({ error: error });
        }
    }

    isValid = async () => {
        await this.updateValidaciones("nombre", 'text', this.state.nombre);
        await this.updateValidaciones("codigo", 'text', this.state.codigo);
    }

    isValidForm = () => {
        this.isValid();
        let valid = this.state.nombre !== '' && this.state.codigo !== '';
        return valid;
    }


    onSubmit = (e) => {
        e.preventDefault();
        let isValid = this.isValidForm();
        console.log(isValid);
        if (isValid === true) {
            let categoria = {
                id: this.state.id,
                codigo: this.state.codigo,
                nombre: this.state.nombre,
                usuario: this.state.idUsuario
            }

            var url = '';
            if (this.state.isEditing) {
                url = api + 'categoria/actualizar'
                
                axios.put(url, { categoria }).then(
                    res => {
                        let success = res.data.success;
                        let msg = res.data.msg;
                        if (success) {
                            alert(msg);
                            this.props.history.push(`/categoria`);
                        } else {
                            alert(msg);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );
            } else {
                url = api + 'categoria/crear';

                axios.post(url, { categoria }).then(
                    res => {
                        console.log(res);
                        let success = res.data.success;
                        let msg = res.data.msg;
                        if (success) {
                            alert(msg);
                            this.props.history.push(`/categoria`);
                        } else {
                            alert(msg);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );
            }
        }else{
            alert('Por favor ingrese los campos requeridos')
        }
    }

    render() {
        return (
            <div className="container">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="txtcatUsuario">Codigo Categoría </label>
                        <input type="text" className="form-control" id="txtcatUsuario" name="codigo" aria-describedby="codigoHelp" value={this.state.codigo} onBlur={this.handleBlur} onChange={this.onChangeCodigo} />
                        <small id="codigoHelp" className="form-text text-muted">Ingrese el codigo de la categoría</small>
                        <div className="error">
                            {this.state.error.codigo}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Categoría</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" aria-describedby="nombreHelp" value={this.state.nombre} onBlur={this.handleBlur} onChange={this.onChangeNombre} />
                        <small id="nombreHelp" className="form-text text-muted">Ingrese el nombre de la categoria</small>
                        <div className="error">
                            {this.state.error.nombre}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginRight: 10 }}>Guardar</button>
                    <Link className="btn btn-secondary" to="/categoria">
                        Cancelar
                    </Link>
                </form>
            </div>
        );
    }
}
