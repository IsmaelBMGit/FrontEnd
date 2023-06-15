import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { user } from '../../service/UserService';
import './style/SignIn.css';




const SignIn = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            user.signIn(email, password).then((response) => {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    navigate("/home");
            }).catch(error => {console.log(error)});
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="maincontainer">
            <div className="container-fluid">
                <div className="row no-gutter">

                    <div className="col-md-6 d-none d-md-flex bg-image"></div>
                    <div className="col-md-6 bg-light">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-8 mx-auto">
                                        <h1 className=" fw-bold">Iniciar sesión</h1>
                                        <p className="text-muted mb-4">¿Aún no eres usuario de TicketWeb?<Link to='/register'>Crear cuenta de usuario</Link></p>

                                        <form>

                                            <div className="mb-3 mt-3">
                                                <input type="text" placeholder="Correo Electrónico" name='email' className="form-control rounded-pill border-0  px-4 py-3 fw-bold" onChange={handleEmailChange} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="password" placeholder="Contraseña" name='password' className="form-control rounded-pill border-0  px-4 text-primary py-3 fw-bold" onChange={handlePasswordChange} />
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input" />
                                                <label className="form-check-label">RECORDAR CONTRASEÑA</label>
                                            </div>
                                            <div className="d-grid gap-2 mt-2">
                                                <input type="button" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm p-2" value='Iniciar sesión' onClick={handleSubmit} />
                                            </div>

                                            <div className="mt-4">
                                                <p className='fw-bold'>&copy;TICKETWEB &nbsp;2023 Todos los derechos reservados</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;