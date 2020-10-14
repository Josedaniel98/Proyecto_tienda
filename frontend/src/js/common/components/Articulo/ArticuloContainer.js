import { connect } from 'react-redux'
import { actions } from  '../../../redux/modules/articulo/articulo'

import Articulos from './ListArticulo'
import Articulo from './Articulo'

const ms2p = (state) => {
  return {
    ...state.articulo,
  };
};

const md2p = { ...actions };

//==================
// Conection List Company
//==================
  const ListArticulo = connect(ms2p, md2p)(Articulos);
  
//==========================
// Conection Create Company
//==========================
const CreateArticulo = connect(ms2p, md2p)(Articulo);


  export const connectionArticulo = {
    ListArticulo,
    CreateArticulo
  }