import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { user } from '../../../../service/UserService';
import Footer from '../../../common/Footer';
import NavBar from '../../../common/NavBar';
import '../style/EditEvent.css';

const EditEvent = () => {
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [, setSelectedCompany] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [price, setPrice] = useState('');


    const handleAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handleImageUrl = (e) => {
        setImageUrl(e.target.value);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleEventChange = (event) => {
        setSelectedEvent(event.target.value);
    };

    useEffect(() => {
        user.currentUser()
            .then((response) => {
                const company = response.data.idUser;
                setSelectedCompany(company);
                // Obtener eventos por ID de la empresa
                user.getEventsByCompany(company)
                    .then((response) => {
                        setEvents(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const editEvent = async (e) => {
        e.preventDefault();

        if (selectedEvent) {
            try {
                if (address !== '' && date !== '') {
                    user.editEvent(selectedEvent, address, imageUrl, date, price)
                        .then(() => {
                            Swal.fire({
                                title: "ÉXITO",
                                text: "EL EVENTO SE HA MODIFICADO CORRECTAMENTE",
                                icon: "success",
                                button: "OK",
                            }).then(() => {
                                window.location.reload();
                            });
                        })

                } else {
                    Swal.fire({
                        title: "ERROR",
                        text: "NO PUEDES ENVIAR DATOS VACIOS",
                        icon: "error",
                        button: "OK",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div id='rootEditEvent'>
            <NavBar />
            <div className='container-fluid animate__animated animate__flipInX' id='editEventContainer'>
                <div className='row pt-3' id='rowEditEvent'>
                    <div className='col-md-12'>
                        <h1 id='editEventTitle'>ACTUALIZAR INFORMACIÓN DE EVENTO</h1>
                        <hr className='border-danger border-2 opacity-75' />
                    </div>
                </div>

                {events.length === 0 ? (
                    <div className="row text-center" id="noEventsMessage">
                        <div className="col-12 mx-auto">
                            <p id='noEvent'>NO TIENES EVENTOS DISPONIBLES, VAMOS A CREAR UNO <a href="/newEvent" className="btn btn-primary">
                                CREAR <i className="fi fi-sr-arrow-alt-square-right"></i>
                            </a></p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='row mb-3 pt-3' id='rowEditEvent'>
                            <div className='col-md-12'>
                                <label className='fw-bold' id='editEventLabelSelect'>EVENTOS</label>
                                <select className='form-select fw-bold' id='editFormControl' value={selectedEvent} onChange={handleEventChange}>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id} className='fw-bold text-center'>
                                            {event.name}-{event.address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {events.length > 0 && selectedEvent && (
                            <>
                                <div className='row mb-3 pt-3' id='rowEditEvent'>
                                    <div className='col-md-12'>
                                        <label className='form-label'>DIRECCIÓN</label>
                                        <input type='text' className='form-control' id='editFormControl' onChange={handleAddress} />
                                    </div>
                                </div>
                                <div className='row mb-3 pt-3' id='rowEditEvent'>
                                    <div className='col-md-6'>
                                        <label className='form-label'>PORTADA</label>
                                        <input type='text' className='form-control' id='editFormControl' onChange={handleImageUrl} />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='form-label'>FECHA</label>
                                        <input type='datetime-local' className='form-control' id='editFormControl' onChange={handleDate} />
                                    </div>
                                </div>

                                <div className="row mt-4" id='rowEditEvent'>
                        <div className="col-4 mx-auto text-center">
                            <label className="col-form-label">PRECIO</label><input type="number" className="form-control" id='form-control' onChange={handlePrice}/>
                        </div>
                    </div>
                                <div className='row mb-3 pt-5' id='rowEditEvent'>
                                    <div className='d-grid gap-2 col-md-6 mx-auto'>
                                        <button className='btn btn-primary' type='button' onClick={editEvent}>ACTUALIZAR EVENTO</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );

};

export default EditEvent;
