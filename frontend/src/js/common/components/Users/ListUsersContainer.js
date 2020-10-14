import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/users/users';
import ListUsers from './ListUsers';


const ms2p = (state) => {
    return {
        ...state.users,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListUsers);