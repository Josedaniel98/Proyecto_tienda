import React, { Component } from 'react';
import EmailForm from './formulario';
import '../LoginRegister/Login/login.css';


class reset_password extends Component {
    render() {
        return (
            <div className="image-background">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Recuperación de contraseña</h1>

                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <EmailForm onSubmit={() => this.props.sendEmail()} />

                    </div>
                </div>

            </div>
        );
    }
}
export default reset_password;
