import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        AppSus
                    </Link>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                                <Link className="navbar-brand" to="/usuario">
                                    Usuario
                                 </Link>
                            </li>

                        </ul>

                    </div>
                </div>

            </nav>
        )
    }
}
