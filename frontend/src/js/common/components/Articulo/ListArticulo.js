import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export default class Articulo extends Component {
    componentWillMount = () => {
        const { listar } = this.props;

        listar();
    }

    handleSearch = (e) => {
        const { listar, filterArticulo } = this.props;

        if (e.target.value != '') {
            filterArticulo(e.target.value);
        } else {
            listar();
        }
    }


    render() {
        const { data, loader, onSortChange, eliminar, page, listar } = this.props;
        console.log(data);
        return (
            <React.Fragment>
                <br />
                <h3 className="uk-text-bold uk-text-lead">Articulos</h3>
                <div className="uk-card uk-card-default uk-padding-small uk-padding uk-margin-auto">
                    <div className="uk-flex uk-flex-between uk-padding uk-padding-remove-bottom uk-margin-auto-top@s">

                     
                        <Link
                            className="uk-button uk-button-primary uk-border-rounded uk-margin-small-bottom uk-button-small uk-flex"
                            to="/articulo/create"
                        >
                            Agregar
                            <i style={{marginLeft: "2px"}} className="material-icons">add_circle_outline</i>
                        </Link>

                    </div>
                    <div className="uk-card uk-padding">
                        <Grid
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
                                dataField="descripcion"
                                dataSort
                            >
                                Descripcion
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="fabrica"
                                dataSort
                                /*  dataFormat={(cell) => {
                                    return cell.label
                                }} */
                            >
                               Fabrica
                            </TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="existencia"
                                dataSort
                            >
                                Existencia
                            </TableHeaderColumn>
                    
                            <TableHeaderColumn
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({eliminar })}
                            >
                                Acciones
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
