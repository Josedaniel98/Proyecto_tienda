import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/setPassword';

import SetPassword from './SetPassword';


const ms2p = (state) => {
    return {
        ...state.login,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(SetPassword);
