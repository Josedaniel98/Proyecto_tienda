import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, validators } from 'validate-redux-form'
import { renderField, renderNumber } from '../Utils/renderField/renderField'


const CreateForm = (props) => {

    const { handleSubmit, ver, isNested, closeModal } = props

    return (
        <form onSubmit={handleSubmit} className="uk-card uk-card-default uk-padding uk-margin-auto uk-flex-1 uk-flex-center">
            <div className="uk-width-1-2@m uk-margin-auto uk-margin-bottom">
                <label>Nombre</label>
                <Field
                    name="nombre"
                    label="Nombre"
                    type="text"
                    component={renderField}
                    className="uk-input uk-border-rounded"
                    disabled={ver}
                />
                <label>Telefono</label>
                <Field
                    name="telefono"
                    label="Telefono"
                    type="text"
                    component={renderNumber}
                    className="uk-input uk-border-rounded"
                    disabled={ver}
                />
            </div>
            <div className="uk-width-1-2@m uk-margin-auto">
                <div className="uk-flex uk-flex-center">

                    {isNested ?
                        <button
                            type="button"
                            className='uk-button uk-button-secondary uk-button-small uk-border-rounded uk-flex'
                            onClick={() => closeModal()}
                        >
                            Cancelar
                        {<i style={{ marginLeft: "2px" }} className="material-icons">cancel</i>}
                        </button>
                        :
                        <a
                            className='uk-button uk-button-secondary uk-button-small uk-border-rounded uk-flex'
                            href='/#/fabrica'
                        >
                            Cancelar
                        {<i style={{ marginLeft: "2px" }} className="material-icons">cancel</i>}
                        </a>
                    }

                    {

                        !ver &&
                        (
                            <button
                                type={isNested ? "button" : "submit"}
                                onClick={isNested ? handleSubmit : null}
                                className='uk-button uk-button-primary uk-button-small uk-border-rounded uk-flex uk-margin-small-left'
                            >
                                Guardar
                                {<i style={{ marginLeft: "2px" }} className="material-icons">save</i>}
                            </button>
                        )
                    }
                </div>
                
            </div>
        </form>
    )
}


export default reduxForm({
    form: 'createFabrica', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
        });
    },
})(CreateForm);
