import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/changePassword';
import ChangePwd from './changePassword';


const ms2p = (state) => {
    return {
        ...state.changePwd,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ChangePwd);
