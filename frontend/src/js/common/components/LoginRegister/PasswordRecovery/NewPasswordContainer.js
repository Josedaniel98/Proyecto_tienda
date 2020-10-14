import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/newPassword';

import NewPassword from './UpdatePassword';


const ms2p = (state) => {
    return {
        ...state.newPassword,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(NewPassword);
