import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { useEffect } from 'react';
import { user } from '../../service/UserService';
import { useState } from 'react';

const Admin = () => {

    const [userRol, setUserRol] = useState(null);

    useEffect(() => {
        const getUserByRol = async () => {
            try {
                const response = await user.currentUser();
                setUserRol(response.data.rol[0]);
            } catch (error) {
                console.log(error);
            }
        }
        getUserByRol();
    }, []);

    
    if (userRol === 'ADMIN') {
        return (
            <nav className='navbar navbar-expand-lg bg-transparent fixed-top' id='adminNavBar'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/home' id='adminTitleNavBar'><i className='fi fi-sr-home m-2'></i>ticketweb</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ms-auto mb-2' id='adminLinksNavBar'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/particular'><i className='fi fi-ss-user m-2'></i>PARTICULARES</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/company'><i className='fi fi-ss-building m-2'></i>EMPRESAS</Link>
                            </li>
                            <li className='nav-item'>
                            <a className='nav-link' href='/'><i className="fi fi-br-power"></i> CERRAR SESIÓN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else if (userRol === 'COMPANY') {
        return (
            <nav className='navbar navbar-expand-lg bg-transparent fixed-top' id='adminNavBar'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/home' id='adminTitleNavBar'><i className='fi fi-sr-home m-2'></i>ticketweb</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ms-auto mb-2' id='adminLinksNavBar'>
                            <li className='nav-item dropdown'>
                                <a className='nav-link dropdown-toggle' href=' ' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    <i className="fi fi-sr-calendar-star"></i> MIS EVENTOS
                                </a>
                                <ul className='dropdown-menu'>
                                    <li><Link className='dropdown-item' to='/newEvent'>CREAR EVENTO</Link></li>
                                    <li><Link className='dropdown-item' to='/editEvent'>MODIFICAR EVENTO</Link></li>
                                    <li><Link className='dropdown-item' to='/viewEvents'>VER MIS EVENTOS</Link></li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/profile'><i className='fi fi-ss-building m-2'></i> MI EMPRESA</Link>
                            </li>
                            <li className='nav-item'>
                            <a className='nav-link' href='/'><i className="fi fi-br-power"></i> CERRAR SESIÓN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className='navbar navbar-expand-lg bg-transparent fixed-top' id='adminNavBar'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/home' id='adminTitleNavBar'><i className='fi fi-sr-home m-2'></i>ticketweb</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ms-auto mb-2' id='adminLinksNavBar'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/events'><i className="fi fi-sr-calendar-star"></i> EVENTOS</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/myTickets'><i className="fi fi-ss-ticket"></i> MIS ENTRADAS</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/profile'><i className='fi fi-ss-user m-2'></i>MI PERFIL</Link>
                            </li>
                            <li className='nav-item'>
                            <a className='nav-link' href='/'><i className="fi fi-br-power"></i> CERRAR SESIÓN</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        );

    }


}

export default Admin;