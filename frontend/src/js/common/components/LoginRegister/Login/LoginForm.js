import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';
import { email } from '../../../../utility/validation';


const LoginForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;

    // const email = value =>
    //     value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    // 'Invalid email address' : undefined

    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="email">Correo electrónico</label>
                <Field
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    validate={email}
                    component={renderField}
                    className="form-control"
                />
            </div>
            <div className="form-group has-feedback">
                <label htmlFor="password">Contraseña</label>
                <Field
                    name="password"
                    label="Contraseña"
                    component={renderField}
                    type="password"
                    className="form-control"
                />
            </div>
            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 btn-block align-self-center">Login</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'login', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            email: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(LoginForm);
