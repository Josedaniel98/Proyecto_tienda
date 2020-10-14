import { connect } from 'react-redux'
import { actions } from  '../../../redux/modules/fabrica/fabrica'

import FabricasScreen from './ListFabricas'
import FabricaScreen from './Fabrica'

const ms2p = (state) => {
  return {
    ...state.fabrica,
  };
};

const md2p = { ...actions };

//===========================
// Conection List Industries
//===========================
const ListFabrica = connect(ms2p, md2p)(FabricasScreen);
  
//==========================
// Conection Create Industry
//=========================?
const CreateFabrica= connect(ms2p, md2p)(FabricaScreen);


  export const connection = {
    ListFabrica,
    CreateFabrica
  }