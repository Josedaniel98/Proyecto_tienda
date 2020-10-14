import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_LOADER = 'SET_LOADER';
const SET_AUTH = 'SET_AUTH';
const SET_EMAIL = 'SET_EMAIL';

export const setAuth = isAuthenticated => ({
    type: SET_AUTH,
    isAuthenticated,
});

export const setEmail = email => ({
    type: SET_EMAIL,
    email,
});

export const actualizarPassword = () => (dispatch, getStore) => {

    const store = getStore()

    const { newPassword:{ email } } = store
    const { form:{newPassword} } = store

    const data = {
        email,
        password: newPassword.values.password 
    }
    
    api.post('user/reset_pwd/', data)
        .then((response) => {
            NotificationManager.success('Contrasena Actualizada correctamente', 'Éxito', 3000);
            dispatch(push("/login"));
        }).catch((error) => {
            NotificationManager.error(error.detail, 'ERROR', 0);
        })
}

const verificarToken = (token='')=>(dispatch, getStore )=>{

    console.log('Estp es ')
    console.log(getStore())
    // dispatch( setAuth(true) )
    console.log(token)
    
    return true

}

export const actions = {
    actualizarPassword,
    verificarToken,
    setAuth,
    setEmail
};

export const reducers = {
    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_AUTH]: (state, { isAuthenticated })=>{
        return {
            ...state,
            isAuthenticated

        }
    },
    [SET_EMAIL]: (state, { email })=>{
        return {
            ...state,
            email            
        }
    }

};

export const initialState = {
    isAuthenticated: false,
    loader: false,
    email:'',

    data: [],
};

export default handleActions(reducers, initialState);
