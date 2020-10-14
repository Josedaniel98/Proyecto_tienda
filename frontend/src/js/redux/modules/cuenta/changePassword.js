import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const LOADER = 'PWD_LOADER';
const SUBMIT = 'SUBMIT_PWD';

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

// ------------------------------------
// Actions
// ------------------------------------

const changePwd = () => (dispatch, getStore) => {
    const state = getStore().form.changePwdForm;
    const data = state.values;
    dispatch(setLoader(true));
    api.post('user/change_pwd', data)
        .then((response) => {
            NotificationManager.success(
                response.detail,
                'Éxito',
                3000,
            );
            dispatch(push('/'));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, 'ERROR', 3000);
        })
        .finally(() => dispatch(setLoader(false)));
};

export const actions = {
    changePwd,
};
export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};
export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
