import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { user } from '../../../service/UserService';
import Footer from '../../common/Footer';
import NavBar from '../../common/NavBar';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [fullname, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleFullName = (e) => {
        setFullName(e.target.value);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleVerifyPassword = (e) => {
        setVerifyPassword(e.target.value);
    };

    useEffect(() => {
        user.currentUser()
            .then((response) => {
                const userId = response.data.idUser;
                user.getUserById(userId)
                    .then((response) => {
                        setUserData(response.data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const editProfile = async (e) => {
        e.preventDefault();

        try {
            if (fullname !== '' && phone !== '') {
                user.editUser(fullname, phone)
                    .then(() => {
                        Swal.fire({
                            title: "ÉXITO",
                            text: "DATOS MODIFICADOS CORRECTAMENTE",
                            icon: "success",
                            button: "OK",
                        }).then(() => {
                            window.location.reload();
                        });
                    })

            } else {
                Swal.fire({
                    title: "ERROR",
                    text: "DEBES DE COMPLETAR LOS CAMPOS EDITABLES",
                    icon: "error",
                    button: "OK",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editPassword = async (e) => {
        e.preventDefault();

        try {
            if (oldPassword !== '' && newPassword !== '' && verifyPassword !== '') {
                user.editPassword(oldPassword, newPassword, verifyPassword)
                    .then(() => {
                        Swal.fire({
                            title: "ÉXITO",
                            text: "LA CONTRASEÑA HA SIDO MODIFICADA",
                            icon: "success",
                            button: "OK",
                        }).then(() => {
                            window.location.reload();
                        });
                    })

            } else {
                Swal.fire({
                    title: "ERROR",
                    text: "NO PUEDE HABER NINGÚN CAMPO VACÍO",
                    icon: "error",
                    button: "OK",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id='rootProfile'>
            <NavBar />
            {isLoading ? (
                <div className='text-center' id='loadingProfile'>
                    <BeatLoader color='#000' size={15} />
                </div>
            ) : (
                userData && (
                    <div className='container-fluid animate__animated animate__bounceInLeft' id='profile'>
                        <div className='row mb-5 mt-3'>
                            <div className='col-12'>
                                <h1 className='text-center'>{userData.fullName.toUpperCase()}</h1>
                                <hr className='border-danger border-2 opacity-75' />
                            </div>
                        </div>

                        {changePassword ? (
                            <>
                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>CONTRASEÑA ACTUAL</label>
                                        <input type='text' className='form-control formControl' onChange={handleOldPassword} />
                                    </div>
                                </div>
                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>NUEVA CONTRASEÑA</label>
                                        <input type='text' className='form-control formControl' onChange={handleNewPassword} />
                                    </div>
                                </div>
                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>VERIFICAR NUEVA CONTRASEÑA</label>
                                        <input type='text' className='form-control formControl' onChange={handleVerifyPassword} />
                                    </div>
                                </div>
                                <div className="row mb-5 d-flex justify-content-center mx-auto ">
                                    <div className="d-grid col-3">
                                        <button type="button" className="btn btn-primary" onClick={editPassword}>ACTUALIZAR CONTRASEÑA</button>
                                    </div>
                                    <div className="d-grid col-3">
                                        <button type="button" className="btn btn-danger" onClick={() => setChangePassword(false)}>CANCELAR</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>NOMBRE COMPLETO</label>
                                        <input type='text' className='form-control formControl' defaultValue={userData.fullName} onChange={handleFullName} />
                                    </div>
                                </div>

                                <div className='row mb-5'>
                                    <div className='col-6'>
                                        <label className='form-label' id='labelProfile'>TIPO DE IDENTIFICACIÓN</label>
                                        <input type='text' className='form-control formControl' id='readOnly' readOnly value={userData.identity} />
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label' id='labelProfile'>NUMERO DE {userData.identity}</label>
                                        <input type='text' className='form-control formControl' id='readOnly' readOnly value={userData.numIdentity} />
                                    </div>
                                </div>

                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>CORREO ELECTRÓNICO</label>
                                        <input type='email' className='form-control formControl' id='readOnly' readOnly value={userData.email} />
                                    </div>
                                </div>

                                <div className='row mb-5'>
                                    <div className='col-12'>
                                        <label className='form-label' id='labelProfile'>TELÉFONO DE CONTACTO</label>
                                        <input type="tel" className='form-control formControl' pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" maxLength='9' defaultValue={userData.phone} onChange={handlePhone} />
                                    </div>
                                </div>

                                <div className="row mb-5 d-flex justify-content-center mx-auto ">
                                    <div className="d-grid col-3">
                                        <button type="button" className="btn btn-dark" onClick={editProfile}>ACTUALIZAR PERFIL</button>
                                    </div>

                                    <div className="d-grid col-3">
                                        <button type="button" className="btn btn-success" onClick={() => setChangePassword(true)}>CAMBIAR CONTRASEÑA</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            )}
            <Footer />
        </div>
    );
};

export default Profile;
