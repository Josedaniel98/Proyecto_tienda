/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'CLIENTE_SUBMIT';
const LOADER = 'CLIENTE_LOADER';
const SET_DATA = 'SET_DATA';
const PAGE = 'SET_PAGE';


export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA,
    data,
});

const setPage = page => ({
    type: PAGE,
    page,
});


// ------------------------------------
// Actions
// ------------------------------------

const onSubmit = () => (dispatch, getStore) => {
    const { values } = getStore().form.clienteForm;

    api.post('cliente', values).then((response) => {
        NotificationManager.success('Cliente registrado correctamente', 'Éxito', 1000);
        dispatch(push('/cliente'));
    }).catch(() => {
        NotificationManager.error('Verifica los datos', 'ERROR', 3000);
    });
};

const detalle = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`cliente/${id}`).then((response) => {
        dispatch(initializeForm('clienteForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const listar = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };

    api.get('cliente', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {
    api.eliminar(`cliente/${id}`).then(() => {
        NotificationManager.success('Cliente eliminado correctamente', 'Éxito', 1000);
        dispatch(listar());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

const actualizar = () => (dispatch, getStore) => {
    const { values } = getStore().form.clienteForm;

    const data = {
        nombre: values.nombre,
    };

    api.put(`cliente/${values.id}`, data).then(() => {
        NotificationManager.success('El cliente se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/cliente'));
    }).catch(() => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    });
};


export const actions = {
    onSubmit,
    listar,
    detalle,
    eliminar,
    actualizar,
   
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
};

export const initialState = {
    loader: false,
    data: {},
    page: 1,
};

export default handleActions(reducers, initialState);
