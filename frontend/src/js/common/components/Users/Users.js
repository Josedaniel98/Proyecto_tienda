import React, {Component} from 'react';
import Formulario from './UsersForm';


class CreateUser extends Component{

    componentWillMount = () => {
        const {match, editar, getPermissions} = this.props;
        if(match.params.id){
            const id = match.params.id;
            editar(id);
        }   
        getPermissions()     
    }
    
    
    render(){
        const {match, registrar,location, listpermission, handleChange, actualizar, permisos_rol, asignar_permiso } = this.props;
        const funcionEnvio = match.params.id ? actualizar : registrar;

        return(
            <div >
                <br/>
                 <h2 className="uk-margin-auto uk-text-bold uk-text-lead">
                    Usuario
                </h2>                
                <Formulario
                    onSubmit={funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    listpermission = { listpermission }
                    handleChange={handleChange}
                    permisos_rol={permisos_rol}
                    asignar_permiso={asignar_permiso}
                    // getPermissions={ getPermissions }
                    ver={location.pathname.includes('ver')}
                />
            </div>            
        )
    }
}

export default CreateUser;