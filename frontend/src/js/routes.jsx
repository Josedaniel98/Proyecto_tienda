import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';

import NewPassword from './common/components/LoginRegister/PasswordRecovery/NewPasswordContainer';
import VerificarToken from './VerificarToken';
// UI kit
import 'uikit/dist/css/uikit.min.css';


import Users from "./common/components/Users/ListUsersContainer";
import CreateUser from "./common/components/Users/UsersContainer";

import { connection } from './common/components/Fabrica/FabricaContainer';

import Clientes from './common/components/Clientes/ClientesContainer';
import ListClientes from './common/components/Clientes/ListClientesContainer';

import cliente from './common/components/Clientes/Clientes';
/* import { conn2 } from './common/components/StageSale/StageSaleContainer'; */
import { connectionArticulo } from './common/components/Articulo/ArticuloContainer';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
    
                <VerificarToken exact path="/reset_pwd/:token" component={NewPassword} />
           

                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />


                <ProtectedRoute exact path="/users" component={Users} />
                <ProtectedRoute exact path="/users/create" component={CreateUser} />
                <ProtectedRoute exact path="/users/:id/editar" component={CreateUser} />
                <ProtectedRoute exact path="/users/:id/ver" component={CreateUser} />


                {/* Industry Routes */}
                <ProtectedRoute exact path="/fabrica" component={connection.ListFabrica} />
                <ProtectedRoute exact path="/fabrica/create" component={connection.CreateFabrica} />
                <ProtectedRoute exact path="/fabrica/:id/editar" component={connection.CreateFabrica} />
                <ProtectedRoute exact path="/fabrica/:id/ver" component={connection.CreateFabrica} />


                {/* Clientes */}
                <ProtectedRoute exact path="/cliente" component={ListClientes} />
                <ProtectedRoute exact path="/cliente/create" component={Clientes} />
                <ProtectedRoute exact path="/cliente/:id/editar" component={Clientes} />
                <ProtectedRoute exact path="/cliente/:id/ver" component={Clientes} />
    
                <ProtectedRoute exact path="/clientes" component={cliente} />


                {/* Company */}
                <ProtectedRoute exact path="/articulo" component={connectionArticulo.ListArticulo} />
                <ProtectedRoute exact path="/articulo/create" component={connectionArticulo.CreateArticulo} />
                <ProtectedRoute exact path="/articulo/:id/editar" component={connectionArticulo.CreateArticulo} />
                <ProtectedRoute exact path="/articulo/:id/ver" component={connectionArticulo.CreateArticulo} />

        
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
