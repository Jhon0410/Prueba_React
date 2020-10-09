import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class navigation extends Component {

    constructor() {
        super();

        this.state = {
            isLogin: false,
            isAdmin:false
        }
    }
    async componentDidMount() {
        const storage = require('../settings/storage');
        let isLogin = await storage.isLogin();
        let isAdmin = await storage.isAdministrador();
        this.setState({ isLogin: isLogin, isAdmin:isAdmin });

    }

    logout = () => {
        const storage = require('../settings/storage');
        storage.logout();
        this.setState({ isLogin: false });
    }



    render() {
        if (!this.state.isLogin) {
            return <Redirect to="/login" />
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        AppSus
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {this.state.isLogin
                            ?
                            this.state.isAdmin
                                ? <ul className="navbar-nav ml-auto">
                                   <li className="nav-item">
                                        <Link className="navbar-brand" to="/usuario">
                                            Usuarios
                                    </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" onClick={() => { this.logout() }} className="navbar-brand" style={{ border: 'none', background: 'transparent' }}>Salir</button>
                                    </li>

                                </ul>
                                :
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">

                                        <Link className="navbar-brand" to="/categoria">
                                            Categorias
                                 </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/producto">
                                            Producto
                                 </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" onClick={() => { this.logout() }} className="navbar-brand" style={{ border: 'none', background: 'transparent' }}>Salir</button>
                                    </li>

                                </ul>

                            :
                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item">
                                    <Link className="navbar-brand" to="/login">
                                        login
                                    </Link>
                                </li>

                            </ul>

                        }
                    </div>
                </div>
            </nav>
        )
    }
}
