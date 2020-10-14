import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/clientes/clientes';
import Clientes from './Clientes';


const ms2p = (state) => {
    return {
        ...state.cliente,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Clientes);