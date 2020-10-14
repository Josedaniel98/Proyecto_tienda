import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/reset_password/reset_password';
import reset_password from './reset_password';


const ms2p = (state) => {
    return {
        ...state.reset_password,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(reset_password);