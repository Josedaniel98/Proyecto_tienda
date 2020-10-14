import React, { Component } from 'react';
import Grid from '../Utils/Grid';
import {standardActions} from '../Utils/Grid/StandardActions';

export default class ListFabricas extends Component {
    componentWillMount = () => {
        const { listar } = this.props;

        listar();
    }


    render() {
        const {data, loader, onSortChange, eliminar, listar, page } = this.props;
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-text-lead uk-text-bold">Fabricas</h3>

                <div className="uk-card uk-card-default uk-padding-small uk-padding uk-margin-auto">
                    <div className="uk-flex uk-flex-between uk-padding uk-padding-remove-bottom uk-margin-auto-top@s">
                        
                        <a
                            className="uk-button uk-button-primary uk-border-rounded uk-margin-small-bottom uk-button-small uk-flex"
                            href="/#/fabrica/create"
                        >

                            Agregar
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
                            dataField="nombre"
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                         
                            dataField="telefono"
                            dataSort
                        >
                            Telefono
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({ eliminar })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}
