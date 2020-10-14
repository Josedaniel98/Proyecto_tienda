import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        return (
            <aside className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${toggleOpen ? '' : 'open'}`}>
                <div className="main-navbar">
                    <nav
                        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light"
                    >
                        <a href="#" className="w-100 mr-0 navbar-brand">
                           <h3>TIENDA ADC</h3>
                        </a>
                        <a
                            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}
                        >
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link " activeClassName="active">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                       
                       
                        <li className="nav-item">
                            <Link to="/articulo" className="nav-link" activeClassName="active">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Articulos</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/fabrica" className="nav-link" activeClassName="active">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Fabricas</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cliente" className="nav-link" activeClassName="active">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">vertical_split</i>
                                </div>
                                <span>Clientes</span>
                            </Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link to="/login" onClick={logOut} className="nav-link">
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default SideBar;
