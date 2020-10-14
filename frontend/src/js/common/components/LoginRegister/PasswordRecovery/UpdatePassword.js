import React, {Component} from 'react';
import NewPasswordForm from "./NewPasswordForm";
import LoadMask from "../../Utils/LoadMask/LoadMask";
import '../Login/login.css';
import {Redirect} from "react-router-dom";
import { api } from 'api';


const actualizarContrasena = () => {
    console.log("Actualizando");
};

class UpdatePassword extends Component {
    // componentWillMount = () => {
    //     const {match} = this.props;
    //     const token = match.params.token;
    //     console.log("token: ", token);

    //     api.post('user/verify_token_pwd', token).then((response) => {
    //         if (response.status === 200)
    //             console.log("Post aceptado");
    //     });
    // }
    render() {
        const { loader, actualizarPassword} = this.props;
        // console.log("props: ", this.props);

        // const { verificarToken } = actions

        // verificarToken()
        // actualizarPassword()

        return (
            <div className="image-background">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center bienvenida">CRM</h1>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Restablecer Contraseña</h5>
                        <LoadMask loading={loader} light>
                            <NewPasswordForm
                                onSubmit={actualizarPassword}
                            />
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdatePassword;
