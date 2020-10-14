import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
// eslint-disable-next-line camelcase
import reset_password from './modules/reset_password/reset_password';
import newPassword from './modules/cuenta/newPassword';

import fabrica from './modules/fabrica/fabrica';

import users from './modules/users/users';

import articulo from './modules/articulo/articulo';

import cliente from "./modules/clientes/clientes";

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    reset_password,
    newPassword,
    fabrica,
    users,
    articulo,
    cliente,
});
