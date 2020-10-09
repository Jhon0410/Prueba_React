import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import homeComponent from './components/homeComponent/home.component';
import usuarioComponent from './components/usuarioComponent/lista.component';
import usuarioEditComponent from './components/usuarioComponent/crear.component';
import categoriaComponent from './components/categoriaComponent/lista.component';
import categoriaEditComponent from './components/categoriaComponent/crear.component';
import productoComponent from './components/productoComponent/lista.component';
import productoEditComponent from './components/productoComponent/crear.component';
import loginComponent from './components/loginComponent/login.component';

function App() {

  return (
    <div>
      <Router>
        <Navigation />
        <div className="container p-4">
          <Route path="/" exact component={homeComponent} />
          <Route path="/home" exact component={homeComponent} />
          <Route path="/usuario" exact component={usuarioComponent} />
          <Route path="/usuario/editar/:id" exact component={usuarioEditComponent} />
          <Route path="/categoria" exact component={categoriaComponent} />
          <Route path="/categoria/editar/:id" exact component={categoriaEditComponent} />
          <Route path="/producto" exact component={productoComponent} />
          <Route path="/producto/editar/:id" exact component={productoEditComponent} />
          <Route path="/login" exact component={loginComponent} />
          <Route path="/logout" exact component={homeComponent} />
        </div>
      </Router>
    </div>
  );
}

export default App;
