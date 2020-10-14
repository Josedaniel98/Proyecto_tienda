import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import UsersForm from '../../../common/components/Users/UsersForm';

const SET_DATA = 'SET_DATA';
const SET_LOADER = 'SET_LOADER';
const SET_REGISTER = 'SET_REGISTER';
const SET_PAGE = 'SET_PAGE';
const SET_PERMISSION='SET_PERMISSION';
const SET_LISTPERMISSION = 'SET_LISTPERMISSION';
const SET_PERMISOS_ROL='SET_PERMISOS_ROL';

const set_permission=(id) =>({
    type: SET_PERMISSION,
    id
})

const set_listPermission =( listpermission ) =>({
    type: SET_LISTPERMISSION,
    listpermission
})

const asignar_permiso=(id) => (dispatch) =>{

    dispatch(set_permission(id));
    
}

const listar = ( page = 1) => (dispatch) => {

    dispatch({type: SET_LOADER, loader: true});
    const params = { page }
    api.get('user', params).then((response)=>{
        
        dispatch({type: SET_DATA, data: response});
        dispatch({type: SET_PAGE, page: page});
    }).catch(() => {
    }).finally(()=>{
        dispatch({type: SET_LOADER, loader: false});
    });
};

export const editar = (id) => (dispatch, getStore) => {
    dispatch({type: SET_LOADER, loader: true});
    api.get(`user/${id}`).then((response)=>{
       
        dispatch(initializeForm('UsersForm', response));
        dispatch({type: SET_REGISTER, register: response});
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(()=>{
        dispatch({type: SET_LOADER, loader: false});
    })
}
const registrar = () => (dispatch, getStore) => {
    dispatch({type: SET_LOADER, loader: true});
    const estado = getStore();
    const formData = estado.form.UsersForm.values;
    console.log(formData)
    const {permissions} = estado.users;
    const permisos = Array.from(permissions)
    const Data={
        ...formData,
        role:formData.role.value,
        permissions
    }
    if(formData.role.label==="Personalizado"){
        console.log("Registra personalizado")
    
    }
    else{
        
    }
    console.log(permisos)
    api.post('user', Data).then((response) => {
        NotificationManager.success('Usuario registrado correctamente', 'Éxito', 1000);
        dispatch(push("/users"));
    }).catch((error) => {
        console.log(error);
        NotificationManager.error('Verifica si el nombre o correo no se repite', 'ERROR', 0);
    }).finally(() => {
        dispatch({type: SET_LOADER, loader: false});
    });
}

const actualizar = () => (dispatch, getStore) => {
    const estado = getStore();
    const formData = estado.form.UsersForm.values;

    api.put(`user/${formData.id}`, formData).then((response) => {
        NotificationManager.success('Usuario actualizado correctamente', 'Éxito', 1000);
        dispatch(push("/user"));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {

    });
}

const eliminar = (id) => (dispatch, getStore) => {
    api.eliminar(`user/${id}`).then((response) => {
      
        NotificationManager.success('Usuario eliminado correctamente', 'Éxito', 1000);
        dispatch(listar());
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {

    });
}


const filterUsers = search => (dispatch) => {
    dispatch({type: SET_LOADER, loader: true});

    api.get(`user/search/${search}`).then((response) => {
        dispatch(setData(response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch({type: SET_LOADER, loader: false});
    });
};

const getPermissions = (search='') => (dispatch, getStore) => {
    let permissions=[];
    
    api.get('permission').then((response)=>{    
        console.log(response.results)   
        dispatch( set_listPermission( response.results ) )

        response.results.forEach(item =>{
            permissions.push({name: item.name, id: item.id})
        })


    }).catch(()=>{
        return [];
    })

}
const handleChange = id =>(dispatch, getStore)=>{
    
    const { listpermission } = getStore().users
    const permisos = Array.from(listpermission) 
    permisos.forEach(item=>{
        const { values } = getStore().form.UsersForm
        const newState={
            ...values,
            [item.name]:false
        }
        dispatch(initializeForm("UsersForm", newState))
    })
    api.get(`role/${id.value}` ).then((response)=>{      
        if(response.name!="Personalizado"){             
            response.permissions.forEach(item =>{
               
               // getStore().form.UsersForm.values[item.name]=true
                const { values } = getStore().form.UsersForm
                const newState={
                    ...values,
                    [item.name]:true
                }
                dispatch(initializeForm("UsersForm", newState))
                dispatch({type: SET_PERMISOS_ROL, permisos_rol: true})
        }  
            )         
        }
        else
        {
            dispatch({type: SET_PERMISOS_ROL, permisos_rol: false})
        }
    }).catch(()=>{
    })
};
/*const handleChange = id =>(dispatch, getStore)=>{
    let permissions=[]
    let permissions3=[]
    //const disabled
    api.get(`role/${id.value}` ).then((response)=>{      
        if(response.name!="Personalizado"){       
            response.permissions.forEach(item =>{
               permissions.push({name: item.name, value: item.id})
               permissions3.push({name: item.name, id: item.id, [item.name]:true})

               const { values } = getStore().form.UsersForm
                const newState={
                    ...values,
                        [item.name]:true               
                }
                console.log("permiso",response.permissions)
                dispatch(initializeForm("UsersForm", newState))
                dispatch({type: SET_PERMISOS_ROL, permisos_rol: true})
        }  
     
            ) 
            const { values } = getStore().form.UsersForm
            
            const newState={
                ...values,
                    permissions2:permissions3               
            }
            
            dispatch(initializeForm("UsersForm", newState))    
        }
        else{
            dispatch({type: SET_PERMISOS_ROL, permisos_rol: false})
            console.log("Es personalizado")  
        }
        response.permissions3=permissions3
       
        dispatch(initializeForm("UsersForm", newState))
    }).catch(()=>{
    })
    const { listpermission } = getStore().users
    const permisos = Array.from(listpermission) 
   
    permisos.forEach(item=>{
        const { values } = getStore().form.UsersForm
        const newState={
            ...values,
                [item.name]:false,
                
        }
        dispatch(initializeForm("UsersForm", newState))
    })
    
};*/



export const actions = {
    registrar,
    actualizar,
    eliminar,
    listar,
    editar,
    filterUsers,
    set_permission,
    getPermissions,
    handleChange,
    asignar_permiso,
};

export const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_PERMISSION]: (state, { id }) => {
        return {
            ...state,
            permissions:[...state.permissions, id],
        };
    },
    [SET_PERMISOS_ROL]: (state, { permisos_rol }) => {
        return {
            ...state,
            permisos_rol,
        };
    },

    [SET_LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },

    [SET_REGISTER]: (state, { register }) => {
        return {
            ...state,
            register,
        };
    },

    [SET_PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_LISTPERMISSION]: (state, { listpermission }) => {
        return {
            ...state,
            listpermission,
        };
    },
};

export const initialState = {
    loader: false,
    data: {},
    register: null,
    page: 1,
    permissions:[],
    listpermission:[],
    permisos_rol:true,
};

export default handleActions(reducers, initialState);
