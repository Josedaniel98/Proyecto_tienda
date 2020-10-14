import React, { Component } from 'react'
import CreateForm from './CreateForm';

export default class Cliente extends Component {

    componentWillMount = () => {

        const { match, detalle } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            detalle(id);
        }
    }

    render() {
        const { onSubmit, actualizar, match, location } = this.props
        const fn = match.params.id ? actualizar : onSubmit
        const isActualizar = (match.params.id) ? true : false
        return (
            <div>
                <br />
                <br />
                <h2 className="uk-margin-auto uk-text-bold uk-text-lead">
                    {
                        (isActualizar)
                            ? 'Detalle Cliente'
                            : 'Crear Cliente'
                    }
                </h2>
                <CreateForm
                    onSubmit={fn}
                    ver={location.pathname.includes('ver') && true}
                />
            </div>
        )
    }
}
