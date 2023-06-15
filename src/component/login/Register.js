import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { user } from '../../service/UserService';
import './style/Register.css';


const Register = () => {

    // CONSTANTS
    const [isParticular, setIsParticular] = useState(true);

    const [fullName, setFullName] = useState("");
    const [numIdentity, setNumIdentity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const navigate = useNavigate();




    const handleCheckboxChange = (e) => {
        setIsParticular(e.target.value === 'particular');
    };

    const handleFullName = (e) => {
        setFullName(e.target.value);
    }

    const handleNumIdentity = (e) => {
        setNumIdentity(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleVerifyPassword = (e) => {
        setVerifyPassword(e.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isParticular) {
                user.registerParticular(fullName, numIdentity, phone, email, password, verifyPassword)
                    .then(() => {
                        swal("¡Enhorabuena!", "El registro se ha completado correctamente", "success");
                        navigate('/');
                    })

            } else {
                user.registerCompany(fullName, numIdentity, phone, email, password, verifyPassword).then(() => {
                    swal("¡Enhorabuena!", "El registro se ha completado correctamente", "success");
                    navigate('/');
                })
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="maincontainer">
            <div className="container-fluid">
                <div className="row no-gutter">

                    <div className="col-md-6 d-none d-md-flex bg-image"></div>

                    <div className="col-md-6 bg-light">
                        <div className="login d-flex align-items-center py-5">

                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-8 mx-auto">
                                        <h1 className=" fw-bold">Crear cuenta de usuario</h1>
                                        <p className="text-muted mb-2">¿Ya eres usuario de TicketWeb?<Link to='/'>Iniciar sesión</Link></p>
                                        <p className="text-muted mb-2">¿Qué tipo de usuario eres?</p>
                                        <form>
                                            <div className="check-radios">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" value="particular" checked={isParticular} onChange={handleCheckboxChange} />
                                                    <label className="form-check-label">PARTICULAR</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" value="company" checked={!isParticular} onChange={handleCheckboxChange} />
                                                    <label className="form-check-label">EMPRESA</label>
                                                </div>
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <input type="text" placeholder={isParticular ? 'Nombre y apellidos' : 'Nombre de la empresa'} name='fullName' className="form-control rounded-pill border-0 px-4 py-3 fw-bold" onChange={handleFullName} required maxLength={30} />
                                            </div>

                                            <div className="mb-3">
                                                <input type="text" placeholder={isParticular ? 'DNI: 12345678X' : 'CIF: B-76345879'} name='numIdentity' className="form-control rounded-pill border-0  px-4 py-3 fw-bold" onChange={handleNumIdentity} required={true} maxLength={isParticular ? 9 : 10} />
                                            </div>

                                            <div className="mb-3">
                                                <input type="number" placeholder="Número de teléfono" name='phone' className="form-control rounded-pill border-0  px-4 py-3 fw-bold" onChange={handlePhone} required={false} max={9} />
                                            </div>

                                            <div className="mb-3">
                                                <input type="text" placeholder="Correo Electrónico" name='email' className="form-control rounded-pill border-0  px-4 py-3 fw-bold" onChange={handleEmail} required={true} maxLength={50} />
                                            </div>

                                            <div className="mb-3">
                                                <input type="password" placeholder="Contraseña" name='password' className="form-control rounded-pill border-0  px-4 text-primary py-3 fw-bold" onChange={handlePassword} required={true} maxLength={70} />
                                            </div>

                                            <div className="mb-3">
                                                <input type="password" placeholder="Verificar contraseña" name='verifyPassword' className="form-control rounded-pill border-0  px-4 text-primary py-3 fw-bold" onChange={handleVerifyPassword} required={true} maxLength={70} />
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input type="checkbox" className="form-check-input" />
                                                <label className="form-check-label">RECORDAR CONTRASEÑA</label>
                                            </div>
                                            <div className="d-grid gap-2 mt-2">
                                                <input type="button" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm p-2" value='Registrarme' onClick={handleSubmit} />
                                            </div>

                                            <div className="mt-4">
                                                <p>Al registrarte, confirmas estar de acuerdo con nuestros Terminos & Condiciones</p>
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

export default Register;