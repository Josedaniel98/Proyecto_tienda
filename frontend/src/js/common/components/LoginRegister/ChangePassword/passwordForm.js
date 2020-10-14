import { Field, reduxForm } from 'redux-form';
import React from 'react';
import { Link } from 'react-router-dom';
import { renderField } from '../../Utils/renderField/renderField';

import './style.css';

const validate = (values) => {
    const errors = {};
    if (!values.oldPassword) {
        errors.oldPassword = 'Campo requerido';
    }
    if (!values.newPassword) {
        errors.newPassword = 'Campo requerido';
    } else if (values.newPassword === values.oldPassword) {
        errors.newPassword = 'No puedes ingresar tu contraseña actual';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Campo requerido';
    } else if (values.confirmPassword !== values.newPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return errors;
};

const ChangePassword = (props) => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit} className="uk-card uk-card-default uk-width-xlarge@m uk-padding uk-margin-auto ">
            <div className="uk-margin-auto uk-width-large@s">
                <div className="uk-margin">
                    <label htmlFor="oldPassword" className="uk-form-label ">
                        Ingrese su contraseña actual
                    </label>
                    <Field
                        name="oldPassword"
                        className="uk-input uk-form-controls"
                        type="password"
                        component={renderField}
                    />
                </div>
                <div className="uk-margin ">
                    <label htmlFor="newPassword" className="uk-form-label">
                        Ingrese su nueva contraseña
                    </label>
                    <Field
                        name="newPassword"
                        className="uk-input uk-form-controls"
                        type="password"
                        component={renderField}
                    />
                </div>
                <div className="uk-margin ">
                    <label htmlFor="confirmPassword" className="uk-form-label">
                        Confirme su nueva contraseña
                    </label>
                    <Field
                        name="confirmPassword"
                        className="uk-input"
                        type="password"
                        component={renderField}
                    />
                </div>
                <div className="btn__container">
                    <button
                        type="submit"
                        className="uk-button uk-button-primary"
                    >
                        Guardar
                    </button>
                    <Link
                        className="uk-button uk-button-secondary uk-margin-left"
                        to="/"
                    >
                        Cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'changePwdForm',
    validate,
})(ChangePassword);
