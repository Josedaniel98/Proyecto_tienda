import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validators } from 'validate-redux-form'
import { renderField, renderNumber } from '../Utils/renderField/renderField'


const ClienteForm = (props) => {

    const { handleSubmit, ver } = props

    return (
        <form onSubmit={handleSubmit} className="uk-card uk-card-default uk-padding uk-margin-auto">
         
             <div className="uk-child-width-1-2@s uk-grid">
                <div>
                    <label>Nombre</label>
                    <Field
                        name="nombre"
                        type="text"
                        component={renderField}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>

                <div>
                    <label>telefono</label>
                    <Field
                        name="telefono"
                        type="text"
                        component={renderNumber}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
                </div>
                <div className="uk-child-width-1-2@s uk-grid">
                <div>
                    <label>Saldo</label>
                    <Field
                        name="saldo"
                        type="text"
                        component={renderNumber}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
                <div>
                    <label>Credito</label>
                    <Field
                        name="credito"
                        type="text"
                        component={renderNumber}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
            </div>
            <div className="uk-child-width-1-2@s uk-grid">
                
                <div>
                    <label>Descuento</label>
                    <Field
                        name="descuento"
                        type="text"
                        component={renderNumber}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
                <div>
                    <label>Direccion</label>
                    <Field
                        name="direccion"
                        type="text"
                        component={renderField}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
            </div>

            <br />
            <div className="uk-flex uk-flex-center">
                <a
                    className="uk-button uk-button-secondary uk-border-rounded uk-button-small uk-flex"
                    href="/#/cliente"
         
                >
                    Cancelar
                    <i style={{ marginLeft: "2px" }} className="material-icons">cancel</i>

                </a>

                {

                    !ver
                    && (
                        <button
                            type="submit"
                            className="uk-button uk-button-primary uk-border-rounded uk-button-small uk-margin-small-left uk-flex"
                        >
                            Guardar
                            <i style={{ marginLeft: "2px" }} className="material-icons">save</i>
                        </button>
                    )
                }
            </div>
           
        </form>
    )
}


export default reduxForm({
    form: 'clienteForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            telefono: validators.exists()('Este campo es requerido'),
            saldo: validators.exists()('Este campo es requerido'),
            credito: validators.exists()('Este campo es requerido'),
            direccion: validators.exists()('Este campo es requerido'),
        });
    },
})(ClienteForm);
