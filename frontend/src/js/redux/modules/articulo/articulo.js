/* Actions of Industry  */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'COMPANY_SUBMIT';
const LOADER = 'COMPANY_LOADER';
const SET_DATAC = 'SET_DATAC';
const SET_PAGEC= 'SET_PAGEC';
const SET_INDUSTRY = 'SET_INDUSTRY';
const OPEN_MODAL_INDUSTRY = 'OPEN_MODAL_INDUSTRY';


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
    type: SET_DATAC,
    data,
});

const setPage = page => ({
    type: SET_PAGEC,
    page,
});
const setModal = stateModal => ({
    type: OPEN_MODAL_INDUSTRY,
    stateModal,
});


// ------------------------------------
// Actions
// ------------------------------------

const formatData = ( values ) => {

    return {
        nombre: values.nombre,
        descripcion: values.descripcion,
        existencia: values.existencia,

        fabrica: values.fabrica.value,
    }

}


const onSubmit = () => (dispatch, getStore) => {
    const { values } = getStore().form.articuloForm;
    console.log(values)
    const data = formatData(values)
    console.log(data)
    api.post('articulo', data).then((response) => {
        NotificationManager.success('Articulo registrado correctamente', 'Éxito', 1000);
        dispatch(push('/articulo'));
    }).catch(() => {
        NotificationManager.error('Verifica los datos', 'ERROR', 3000);
    });
};

const detalle = id => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`articulo/${id}`).then((response) => {
        dispatch(initializeForm('articuloForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const filterArticulo = search => (dispatch) => {
    dispatch(setLoader(true));

    api.get(`articulo/search/${search}`).then((response) => {
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

    api.get('articulo', params).then((response) => {
        dispatch(setData(response));
        dispatch(setPage(page));
    }).catch(() => {
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

const eliminar = id => (dispatch) => {
    api.eliminar(`articulo/${id}`).then(() => {
        NotificationManager.success('Articulo eliminado correctamente', 'Éxito', 1000);
        dispatch(listar());
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

const actualizar = () => (dispatch, getStore) => {
    const { values } = getStore().form.articuloForm;

    const data = formatData(values)

    api.put(`articulo/${values.id}`, data).then(() => {
        NotificationManager.success('El articulo se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/articulo'));
    }).catch(() => {
        NotificationManager.error('Hubo error en la actualización', 'ERROR', 0);
    });
};

const registerFabrica = () => (dispatch, getState) => {

    const formData = getState().form.createFabrica.values;
    api.post('fabrica', formData).then((response) => {
        NotificationManager.success('fabrica registrada correctamente', 'Éxito', 1000);     
        const nuevo_elemento = {value: response.id, label: response.name}                
        dispatch(setModal(false));
        let formValues = getState().form.articuloForm.values;
        formValues = !!formValues ? formValues : {};
        formValues.fabrica = nuevo_elemento;
        dispatch(initializeForm('articuloForm', formValues));
    }).catch(() => {
        NotificationManager.error('Verifica si el nombre no se repite', 'ERROR', 3000);
    }).finally(() => {
        
    });
}

const getFabricas = ()=>()=>{

    let fabricas = []

    return api.get('fabrica').then((response)=>{
            
            response.results.forEach( lifecycle => {
                fabricas.push({ value: lifecycle.id, label: lifecycle.nombre })
            })

            return fabricas
        })
        .catch((err)=>{
            return fabricas
        })
}

const openModal = ()=>(dispatch)=>{
    dispatch( setModal(true) )
}
const closeModal = ()=>(dispatch)=>{
    dispatch( setModal(false) )
}

export const actions = {
    onSubmit,
    listar,
    detalle,
    eliminar,
    actualizar,
    filterArticulo,
    registerFabrica,
    getFabricas,
    openModal,
    closeModal,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATAC]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PAGEC]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_INDUSTRY]: (state, { industry }) => {
        return {
            ...state,
            industry,
        };
    },
    [OPEN_MODAL_INDUSTRY]: (state, { stateModal }) => {
        return {
            ...state,
            stateModal,
        };
    },        
};

export const initialState = {
    loader: false,
    data: {},
    page: 1,
    stateModal: false,
    fabrica: null,
};

export default handleActions(reducers, initialState);
