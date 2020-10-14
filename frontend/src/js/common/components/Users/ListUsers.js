import React, {Component} from 'react';
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListUsers extends Component {
    componentWillMount = () => {
        const { listar } = this.props;

        listar();
    }

    handleSearch = (e) => {
        const { listar, filterUsers } = this.props;
        if (e.target.value != '') {
            filterUsers(e.target.value);
        } else {
            listar();
        }
    }

    render() {
        const {data, loader, onSortChange, eliminar, listar, page} = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-text-bold uk-text-lead uk-width-1-2">
                    Gestión de usuarios
                </h3>
   
                <div className="uk-card uk-card-default uk-padding-small uk-padding uk-margin-auto">
                    <div className="uk-flex uk-flex-between uk-padding uk-padding-remove-bottom uk-margin-auto-top@s">
                        <input
                            type="text"
                            className="uk-input uk-border-rounded uk-width-1-5"
                            placeholder="Buscar..."
                            onChange={this.handleSearch}
                        />
                        <a
                            className="uk-button uk-button-primary uk-border-rounded uk-button-small uk-margin-small-bottom uk-flex"
                            href="/#/users/create"
                        >
                            Registrar
                            <i style={{marginLeft: "2px"}} className="material-icons">add_circle_outline</i>
                        </a>
                    </div>

                    <Grid
                        className="uk-padding"
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        onSortChange={onSortChange}
                        page={page}

                    >
                        <TableHeaderColumn
                            isKey
                            dataField="username"
                            dataSort
                        >
                            Nombre de usuario
                        </TableHeaderColumn>

                        <TableHeaderColumn
                            dataField="first_name"
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="last_name"
                            dataSort
                        >
                            Apellido
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="email"
                            dataSort
                        >
                            Correo electronico
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="role"
                            dataSort
                        >
                            Rol
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ editar: "users", ver: "users", eliminar })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default ListUsers;
