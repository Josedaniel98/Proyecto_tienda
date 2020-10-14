import React, { Component } from 'react'
import NewPasswordForm from '../PasswordRecovery/NewPasswordForm';
import LoadMask from '../../Utils/LoadMask/LoadMask';


export default class SetPassword extends Component {


    render() {
        const { changePassword, loader } = this.props;

        return (
            <div className="image-background">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center bienvenida">Ciancoders CRM</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Restablecer Contraseña</h5>
                        <LoadMask loading={ loader } light>
                            <NewPasswordForm
                                onSubmit={ changePassword }
                            />
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}
