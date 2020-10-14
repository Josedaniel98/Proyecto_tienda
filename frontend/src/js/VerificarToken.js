import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from './redux/modules/cuenta/newPassword'
import { api } from './utility/api';

class VerificarToken extends Component {

    componentWillMount = () => {

        const {computedMatch:{params}, dispatch } = this.props;
        const { setAuth,setEmail } = actions
        
        api.post('user/verify_token_pwd', JSON.stringify(params))
            .then(({ user_email }) => {
    
            dispatch( setAuth(true) )
            dispatch( setEmail(user_email) )

        }).catch( err =>{
            console.log(err)
        });
    }

    render() {
        const { component: Component, newPassword, ...rest} = this.props;


        const valido =newPassword.isAuthenticated

        return (
            <Route

                {...rest}
                render={props =>
                    ( valido )
                    ? (
                        <Component {...props } />
                      )
                    : (
                        <h2 className="uk-card uk-card-default uk-margin-large">
                            Token no válido
                        </h2>
                     )
                }
            />
        )
    }
}

const mstp = state => ({ ...state });


const verificarToken = connect(
    mstp
)(VerificarToken);

export default  verificarToken;