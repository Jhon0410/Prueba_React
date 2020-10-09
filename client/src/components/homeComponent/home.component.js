import React, { Component } from 'react';

export default class HomeComponent extends Component {
    constructor() {
        super();
        this.state = {
            isLogin: false,
        };
    }

     componentDidMount() {
        const storage = require('../../settings/storage');
        let isLogin = storage.isLogin();
        this.setState({ isLogin: isLogin });
    }


    render() {
       

        return (
            <div className="container">
            <p>Prueba técnica Reac</p>
            <p>AppSus</p>
            <p>Jhon Edward Gomez</p>
        </div>
        );
    }
}
