import React from 'react';
import { Field, reduxForm, clearFields } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { api } from "api";
import { renderField, renderNumber, AsyncSelectField } from '../Utils/renderField';
import CreateModal from '../Utils/renderField/createModal';
import Modal from '../Utils/Modal/ReactModal';
import CreateForm from '../Fabrica/CreateForm';
import { phone } from '../../../utility/validation';

const ArticuloForm = (props) => {
    const { handleSubmit, ver, getFabricas } = props;
    const { stateModal, openModal, closeModal } = props;
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
                    <label>Descripcion</label>
                    <Field
                        name="descripcion"
                        type="text"
                        component={renderField}
                        className="uk-input uk-border-rounded"
                        disabled={ver}
                    />
                </div>
            </div>
            <div className="uk-child-width-1-2@s uk-grid">
                <div>
                    <label>Fabrica</label>
                    <div>
                        <Field
                            name="fabrica"
                            type="text"
                            placeholder="Seleccionar..."
                            loadOptions={getFabricas}
                            /* component={CreateModal} */
                            component={AsyncSelectField}
                            /* className="uk-input uk-border-rounded" */
                            disabled={ver}
                        />

                    </div>

                    <div>
                        <button
                            disabled={ver}
                            className="uk-button uk-button-link uk-align-right uk-margin-remove-bottom "
                            onClick={() => openModal()}
                        >
                            + Fabrica

                        </button>
                    </div>
                </div>
                <div>
                    <label>Existencia</label>
                    <Field
                        name="existencia"
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
                    href="/#/articulo"
                    etapas={null}
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

            <Modal showModal={stateModal}>
                <CreateForm
                    isNested
                    closeModal={closeModal}
                    onSubmit={props.funcionRegistro}
                />
            </Modal>

        </form>
    );
};


export default reduxForm({
    form: 'articuloForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            existencia: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
            fabrica: validators.exists()('Este campo es requerido'),
            /* business_lines: validators.exists()('Este campo es requerido'),
            sales_channel: validators.exists()('Este campo es requerido'), */
        });
    },
})(ArticuloForm);
