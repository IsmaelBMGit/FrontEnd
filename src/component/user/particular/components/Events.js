import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { user } from '../../../../service/UserService';
import micro from '../../../admin/image/micro.jpg';
import Footer from '../../../common/Footer';
import NavBar from '../../../common/NavBar';
import '../style/Events.css';

const Events = () => {

    const [provinces, setProvinces] = useState([]);
    const [municipes, setMunicipes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipe, setSelectedMunicipe] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bankNumber, setBankNumber] = useState('');
    const [viewBankNumber, setViewBankNumber] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);


    const navigate = useNavigate();


    const handleBankNumber = (e) => {
        setBankNumber(e.target.value);
    }

    useEffect(() => {
        const getAllEvents = async () => {
            try {
                const response = await user.getAllEvents();
                const allEvents = response.data;

                setEvents(allEvents);
                setFilteredEvents(allEvents);
            } catch (error) {
                console.log(error);
            }
        }
        getAllEvents();
    }, []);


    useEffect(() => {
        filterEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, selectedMunicipe]);

    const searchChange = (e) => {
        setSearchTerm(e.target.value);
        filterEvents();
    };

    const filterEvents = () => {
        const filteredBySearch = events.filter(
            (event) =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const filteredByDate = filteredBySearch.filter((event) => {
            if (startDate && endDate) {
                const eventDate = new Date(event.date);
                return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
            }
            return true;
        });

        const filteredByMunicipe = filteredByDate.filter((event) =>
            selectedMunicipe ? event.municipe.id === parseInt(selectedMunicipe) : true
        );

        setFilteredEvents(filteredByMunicipe);
        setShowResetButton(startDate || endDate || selectedMunicipe || searchTerm);


    };

    const resetFilters = () => {
        setSelectedProvince('');
        setStartDate('');
        setEndDate('');
        setSelectedMunicipe('');
        setSearchTerm('');
    };

    useEffect(() => {
        const getAllProvinces = async () => {
            try {
                const response = await user.getAllProvinces();
                setProvinces(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProvinces();
    }, []);

    useEffect(() => {
        const getMunicipesByProvince = async () => {
            if (selectedProvince) {
                try {
                    const response = await user.getMunicipesByProvince(selectedProvince);
                    setMunicipes(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getMunicipesByProvince();
    }, [selectedProvince]);

    const buyTicket = async (e) => {
        e.preventDefault();
        try {
            await user.buyTicket(
                selectedEvent.imageUrl,
                selectedEvent.date,
                selectedEvent.price,
                bankNumber,
                selectedEvent.id
            );

            Swal.fire({
                icon: 'success',
                title: 'ÉXITO',
                text: '¡LA COMPRA SE HA REALIZADO CORRECTAMENTE!',
            }).then(() => {
                navigate("/myTickets");
            });
        } catch (error) {
            console.log(error);
        }
    };



    const renderEventDetails = () => {
        if (!selectedEvent) {
            return null;
        }

        return (
            <div className='row align-items-center'>
                <div className='col-md-4' id='divImgDetail'>
                    {selectedEvent.imageUrl ? (
                        <img
                            src={selectedEvent.imageUrl}
                            alt='...'
                            className='card-img'
                            id='eventDetailImg'
                            style={{ width: '400px', height: '370px' }}
                        />
                    ) : (
                        <img
                            src={micro}
                            alt='...'
                            className='card-img'
                            id='eventDetailImg'
                            style={{ width: '400px', height: '370px' }}
                        />
                    )}
                </div>
                <div className='col-md-8' id='detailData'>
                    <div>
                        <label id='labelDetail'>EVENTO</label>
                        <p id='eventName'>{selectedEvent.name.toUpperCase()}</p>
                    </div>

                    <div>
                        <label id='labelDetail'>FECHA</label>
                        <p>
                            Tendrá lugar el{' '}
                            <Moment format='D [de] MMMM [de] YYYY'>{selectedEvent.date}</Moment> a partir de las{' '}
                            <Moment format='HH:mm'>{selectedEvent.date}</Moment>
                        </p>
                    </div>

                    <div>
                        <label id='labelDetail'>DIRECCIÓN</label>
                        <p>
                            {selectedEvent.address} - <b>{selectedEvent.municipe.name}</b>
                        </p>
                    </div>

                    <div>
                        <label id='labelDetail'>PRECIO POR ENTRADA</label>
                        <p id='priceEvent'>{selectedEvent.price}€</p>
                    </div>
                </div>



                <div className="row pt-3 mb-5">
                    <div className="d-grid col-4 mx-auto">
                        <button className='btn btn-success' type='button' onClick={() => setViewBankNumber(true)}>COMPRAR ENTRADA <i className='fi fi-br-check'></i></button>
                    </div>
                </div>

                {viewBankNumber && (
                    <>
                        <div className='row pt-3 mb-5 animate__animated animate__fadeIn'>
                            <div className='col-4 mx-auto'>
                                <label>NUMERO DE CUENTA BANCARIA</label>
                                <input type='text' maxLength='16' className='form-control' pattern='[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}' onChange={handleBankNumber}
                                />
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center mb-5">
                            <div className="d-grid col-3">
                                <button type="button" className="btn btn-primary" onClick={buyTicket}>CONFIRMAR</button>
                            </div>
                            <div className="d-grid col-3">
                                <button type="button" className="btn btn-danger" onClick={() => window.location.reload()}>CANCELAR</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };



    return (
        <div id='rootEvents'>
            <NavBar />
            <div className='container-fluid animate__animated animate__fadeIn' id='particularEvents'>
                <div className='row pt-3'>
                    <div className='col-md-12'>
                        {!selectedEvent ?
                            <>
                                <h1 className='text-center'>EVENTOS</h1>
                                <hr className='border-danger border-2 opacity-75' />
                            </>
                            :
                            <>
                                <button className='btn btn-link' onClick={() => setSelectedEvent(null)}><i className="fi fi-ss-circle-x"></i></button>
                                <h1 className='text-center'>DETALLE DEL EVENTO</h1>

                                <hr className="border-danger border-2 opacity-75" />
                            </>
                        }
                    </div>
                </div>

                {!selectedEvent ? (
                    <>
                        <div className='row d-flex justify-content-center align-items-center text-center pt-5 mb-5'>
                            <label className='col-md-2 col-form-label'><i className="fi fi-ss-hand-back-point-right mx-2" id='handSearch'></i>  BUSQUEDA</label>
                            <div className='col-md-8'>
                                <input type='search' className='form-control' id='eventInputSearch' placeholder='Buscar un evento' onChange={searchChange} />
                            </div>
                        </div>

                        <div className='row mb-5 text-center'>
                            <div className={!selectedProvince ? 'col-md-6 mx-auto' : 'col-md-6'}>
                                <label className='form-label'>PROVINCIA</label>
                                <select
                                    className='form-select' id='form-control'
                                    value={selectedProvince}
                                    onChange={(e) => setSelectedProvince(e.target.value)}
                                >
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={!selectedProvince ? 'd-none' : 'col-md-6'}>
                                <label className='form-label'>MUNICIPIO</label>
                                <select className='form-select' id='form-control' value={selectedMunicipe}
                                    onChange={(e) => setSelectedMunicipe(e.target.value)}>
                                    {municipes.map((municipe) => (
                                        <option key={municipe.id} value={municipe.id}>
                                            {municipe.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='row m-2'>
                            <div className='col-md-4 mb-3 mx-auto'>
                                <label className='form-label'>DESDE </label>
                                <input
                                    type='datetime-local'
                                    className='form-control'
                                    id='form-control'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>

                            <div className='col-md-4 mb-3 mx-auto'>
                                <label className='form-label'>HASTA </label>
                                <input
                                    type='datetime-local'
                                    className='form-control'
                                    id='form-control'
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        {showResetButton && (
                            <div className='row'>
                                <div className='d-grid col-3 mx-auto mb-3'>
                                    <button className="btn btn-dark" onClick={resetFilters}>
                                        RESTABLECER
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : null}

                {selectedEvent ? (
                    renderEventDetails()
                ) : (

                    <div className='mb-5' id='containerEventCard'>
                        {filteredEvents.map((event) => (
                            !event.eventNonLocked ? null : (
                            <div
                                className={event.eventNonLocked ? 'card bg-transparent mb-3' : 'd-none'}
                                id='eventCardHorizontal'
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                            >
                                <div className='row g-0' id='eventCardContent'>
                                    <div className='col-md-2'>
                                        {event.imageUrl ? (
                                            <img
                                                src={event.imageUrl}
                                                alt='...'
                                                className='card-img d-lg-block d-md-none d-sm-none'
                                                id='eventImgCard'
                                            />
                                        ) : (
                                            <img
                                                src={micro}
                                                alt='...'
                                                className='card-img d-lg-block d-md-none d-sm-none'
                                                id='eventImgCard'
                                            />
                                        )}
                                    </div>

                                    <div className='col-md-10' id='eventCardBody'>
                                        <div className='card-body'>
                                            <h3 className='card-title m-auto' id='newEventCardTitle'>
                                                {event.name.toUpperCase()}
                                            </h3>
                                            <p className='card-text m-auto' id='eventCardText'>
                                                Tendra lugar el <Moment format='D [de] MMMM [de] YYYY'>{event.date}</Moment> a partir de las <Moment format='HH:mm'>{event.date}</Moment>

                                            </p>
                                            <p className='card-text m-0' id='eventCardText'>
                                                {event.address} - {event.municipe.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Events;