import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SET_DATA = 'SET_DATA';
export const sendEmail = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.reset_password.values;

    api.post('user/email_reset_pwd/', formData).then((response) => {
        NotificationManager.success('Enlace enviado correctamente', 'Éxito', 3000);
        dispatch(push("/login"));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        
    });
}

export const actions = {
    sendEmail,
};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },     
};

export const initialState = {
    loader: false,
    me: {},
    data: [],
    registro: null,
};

export default handleActions(reducers, initialState);