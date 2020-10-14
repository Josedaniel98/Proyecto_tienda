import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";


const changePassword = ()=>(dispatch, getStore )=>{

    const store = getStore()
    const { me: {email} } = store.login
    const { newPassword:{ values } } = store.form

    const data ={
        email,
        password:  values.password,
        is_verified: true
    }

    api.post('user/reset_pwd/', data)
    .then((response) => {
        NotificationManager.success('Contrasena Actualizada correctamente', 'Éxito', 3000);
        localStorage.removeItem('token');
        dispatch(push("/login"));
    }).catch((error) => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    })
}

export const actions = {
    changePassword
};


export const reducers = {
};

export const initialState = {
};

export default handleActions(reducers, initialState);