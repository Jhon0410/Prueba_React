import axios from 'axios';
import React, { Component } from 'react';
import storage from '../../settings/storage';
import { api } from '../../settings/configuracion';
import Select from 'react-select';
import { Link } from 'react-router-dom';

export default class ProductoEditComponent extends Component {
    constructor() {
        super();
        const validator = require('../utils/validaciones.utils');
        this.state = {
            id: 0,
            nombre: '',
            precio: 0,
            stock: 1,
            categoriaid: 0,
            validator: validator,
            selectedOption: null,
            isEditing: false,
            error: {},
            selectOptions: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.cargarOptions()
        if (id !== undefined && parseInt(id) > 0) {
            this.setState({ isEditing: true }, () => {
                this.cargarProducto(id);
            })
        }

    }

    cargarOptions = () => {
        let usuarioId = storage.usuarioEnSession();
        let url = api + 'categoria/todos/' + usuarioId;
        axios.get(url).then(
            res => {
                const data = res.data
                const options = data.map(d => ({
                    "value": d.id,
                    "label": d.nombre
                }))
                this.setState({ selectOptions: options })
            }
        ).catch(
            err => {
                console.log("ocurrio un error")
            }
        );
    }

    cargarProducto(id) {
        let url = api + 'producto/porid/' + id;
        axios.get(url).then(
            res => {
                let producto = res.data;
                if (producto) {
                    this.setState({
                        ...this.state,
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        stock: producto.stock,
                        categoriaid: producto.categoriaid
                    });
                    let select = this.state.selectOptions.find(item => item.value === producto.categoriaid);
                    if (select){
                        this.setState({ selectedOption: select });
                    }
                    
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
    onChangePrecio = (e) => {
        this.setState({ precio: e.target.value })
    }
    onChangeStock = (e) => {
        this.setState({ stock: e.target.value })
    }
    onChangeCategoria = (e) => {
        this.setState({ selectedOption: e });
        this.setState({ categoriaid: e.value })
    }

    handleBlur = evt => {
        const { type, value, name } = evt.target;
        this.updateValidaciones(name, type, value)
    }

    updateValidaciones = (name, type, value) => {
        // console.log('updateValidaciones', name);
        var error = this.state.validator.validacionSoloLetras(name, value);
        //console.log(error)
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
    }

    isValidForm = () => {
        this.isValid();
        console.log(this.categoriaid !== 0);
        console.log(this.categoriaid !== 0);
        console.log(this.categoriaid !== '0');
        let valid = this.state.nombre !== '' && this.state.precio !== '' && this.state.stock !== '' && this.state.categoriaid !== 0;
        return valid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        let isValid = this.isValidForm();
        console.log(isValid);
        if (isValid) {
            let producto = {
                id: this.state.id,
                nombre: this.state.nombre,
                precio: this.state.precio,
                stock: this.state.stock,
                categoria: this.state.categoriaid
            }

            var url = '';
            if (this.state.isEditing) {
                url = api + 'producto/actualizar';
                axios.put(url, { producto }).then(
                    res => {

                        let success = res.data.success;
                        let msg = res.data.msg;
                        if (success) {
                            alert(msg);
                            this.props.history.push(`/producto`);
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
                url = api + 'producto/crear';
                axios.post(url, { producto }).then(
                    res => {
                        //console.log(res);
                        let success = res.data.success;
                        let msg = res.data.msg;
                        if (success) {
                            alert(msg);
                            this.props.history.push(`/producto`);
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
        } else {
            alert('Por favor ingrese los campos requeridos')
        }
    }

    render() {
        return (
            <div className="container">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre producto</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" aria-describedby="nombreHelp" value={this.state.nombre} onBlur={this.handleBlur} onChange={this.onChangeNombre} />
                        <small id="nombreHelp" className="form-text text-muted">Ingrese el nombre del producto</small>
                        <div className="error">
                            {this.state.error.nombre}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtprecio">Precio</label>
                        <input type="number" className="form-control" min="0" id="txtprecio" name="precio" aria-describedby="precioHelp" value={this.state.precio} onBlur={this.handleBlur} onChange={this.onChangePrecio} />
                        <small id="precioHelp" className="form-text text-muted">Ingrese precio</small>
                        <div className="error">
                            {this.state.error.precio}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtstock">Stock</label>
                        <input type="number" className="form-control" min="1" id="txtstock" name="stock" aria-describedby="stockHelp" value={this.state.stock} onBlur={this.handleBlur} onChange={this.onChangeStock} />
                        <small id="stockHelp" className="form-text text-muted">Ingrese stock</small>
                        <div className="error">
                            {this.state.error.stock}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtcategoriaid">Categoria</label>
                        <Select options={this.state.selectOptions} value={this.state.selectedOption} onChange={this.onChangeCategoria} />
                        <div className="error">
                            {this.state.error.categoria}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginRight: 10 }}>Guardar</button>
                    <Link className="btn btn-secondary" to="/producto">
                        Cancelar
                    </Link>
                </form>
            </div>
        );
    }
}
