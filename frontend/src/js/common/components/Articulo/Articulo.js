import React, { Component } from 'react'
import CreateForm from './CreateForm';

export default class Form extends Component {
    componentWillMount = () => {
        const {match, detalle} = this.props;
        if(match.params.id){
            const id = match.params.id;
            detalle(id);
        }
    }

    componentWillUnmount = () => {
        const {closeModal} = this.props;
        closeModal()
    }
    render() {
    

        const { match, location, actualizar,getFabricas, onSubmit} = this.props;
        const {openModal, closeModal, stateModal} = this.props;
        const funcionEnvio = match.params.id ? actualizar : onSubmit;
        const isActualizar = (match.params.id ) ? true : false
        return (
            <div>
                <br />
                <h2 className="uk-margin-auto uk-text-bold uk-text-lead">
                    {
                        (isActualizar) 
                        ?'Detalle Articulo'
                        :'Crear Articulo'
                    }
                </h2>
                    <CreateForm
                        ver={location.pathname.includes('ver')}
                        onSubmit={funcionEnvio}
                        openModal={openModal}
                        closeModal={closeModal}
                        stateModal={stateModal}
                        funcionRegistro={this.props.registerFabrica}
                        getFabricas = { getFabricas }
                    />
            </div>
        )
    }
}
