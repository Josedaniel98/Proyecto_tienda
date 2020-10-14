import React, { Component } from 'react';
import ChangePasswordForm from './passwordForm';

class ChangePassword extends Component {
    render() {
        const { changePwd } = this.props;


        return (
            <div>
                <br />
                <h2 className="uk-text-bold uk-width-xlarge@s uk-text-lead uk-margin-auto">
                    Cambio de contraseña
                </h2>
                <ChangePasswordForm onSubmit={changePwd} />
            </div>
        );
    }
}

export default ChangePassword;
