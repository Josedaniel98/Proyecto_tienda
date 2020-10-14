import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/users/users';
import CreateUser from './Users';


const ms2p = (state) => {
    return {
        ...state.users,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CreateUser);