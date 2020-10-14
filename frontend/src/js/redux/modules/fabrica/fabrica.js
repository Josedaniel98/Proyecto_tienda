/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'INDUSTRY_SUBMIT';
const LOADER = 'INDUSTRY_LOADER';
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
    const { values } = getStore().form.createFabrica;

    api.post('fabrica', values).then((response) => {
        NotificationManager.success('Fabrica registrada correctamente', 'Éxito', 1000);
        dispatch(push('/fabrica'));
    }).catch(() => {
        NotificationManager.error('Verifica los datos', 'ERROR', 3000);
    });
};

const detalle = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`fabrica/${id}`).then((response) => {
        dispatch(initializeForm('createFabrica', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const filterFabrica = search => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`fabrica/search/${search}`).then((response) => {
        dispatch(setData(response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};


const listar = (page = 1) => (dispatch) => {
    dispatch(setLoader(true));
    const params = { page };

    api.get('fabrica', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {
    api.eliminar(`fabrica/${id}`).then(() => {
        NotificationManager.success('Fabrica eliminada correctamente', 'Éxito', 1000);
        dispatch(listar());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

const actualizar = () => (dispatch, getStore) => {
    const { values } = getStore().form.createFabrica;

    const data = {
        nombre: values.nombre,
    };

    api.put(`fabrica/${values.id}`, data).then(() => {
        NotificationManager.success('La fabrica se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/fabrica'));
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
    filterFabrica,
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
