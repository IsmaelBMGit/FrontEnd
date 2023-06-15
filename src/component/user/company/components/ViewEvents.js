import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { user } from '../../../../service/UserService';
import micro from '../../../admin/image/micro.jpg';
import Footer from '../../../common/Footer';
import NavBar from '../../../common/NavBar';
import '../style/ViewEvents.css';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showSoldTicket, setShowSoldTicket] = useState(false);
  const [soldTickets, setSoldTickets] = useState(0);

  useEffect(() => {
    user.currentUser()
      .then((response) => {
        const company = response.data.idUser;
        setSelectedCompany(company);
        setIsLoading(true);
        setTimeout(() => {
          user.getEventsByCompany(company)
            .then((response) => {
              setEvents(response.data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const confirmDisableEvent = (idEvent) => {
    Swal.fire({
      title: '¿ESTÁS SEGURO?',
      text: 'SE BLOQUEARÁ EL EVENTO Y DEJARÁ DE ESTAR DISPONIBLE',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'BLOQUEAR <i class="fi fi-br-ban mx-2 text-center"></i>',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        disableEvent(idEvent);
      }
    });
  };

  const confirmEnableEvent = (idEvent) => {
    Swal.fire({
      title: '¿DESBLOQUEAR EL EVENTO?',
      text: 'AL ACTIVAR DE NUEVO EL EVENTO, VOLVERA A ESTAR DISPONIBLE',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DESBLOQUEAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        enableEvent(idEvent);
      }
    });
  };


  const disableEvent = async (idEvent) => {
    try {
      await user.disabledEvent(idEvent);
      Swal.fire('ÉXITO', 'EL EVENTO HA SIDO BLOQUEADO CORRECTAMENTE', 'success').then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.log(error);
    }
  };

  const enableEvent = async (idEvent) => {
    try {
      await user.enabledEvent(idEvent);
      Swal.fire('ÉXITO', 'EL EVENTO HA SIDO DESBLOQUEADO Y VOLVERÁ A ESTAR DISPONIBLE', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleConsult = async (idEvent) => {
    try {
      const response = await user.getSoldTickets(idEvent);
      const ticketsSold = response.data;

      if (ticketsSold >= 0) {
        setSoldTickets(ticketsSold);
        setShowSoldTicket(true);
      } else {
        setShowSoldTicket(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedEvent) {
      setSoldTickets(0);
      setShowSoldTicket(false);
    }
  }, [selectedEvent]);

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
        </div>

        <div className='row pt-3'>
          <div className='col-8 text-center'>
            <p id='txtDetailCount'>
              CONSULTA LAS ENTRADAS VENDIDAS DEL EVENTO
              <button className='btn btn-outline-warning m-1' onClick={() => handleConsult(selectedEvent.id)}>CONSULTAR <i className='fi fi-sr-arrow-alt-square-right'></i></button>
              {showSoldTicket && (
                <span className='mx-4'>ENTRADAS VENDIDAS : <span id='soldTicket'>{soldTickets}</span></span>
              )}
            </p>
          </div>
        </div>

        <div className='row'>
          <div className='d-grid col-3 mx-auto mb-3'>
            {selectedEvent.eventNonLocked ? (
              <button className='btn btn-danger' type='button' onClick={() => confirmDisableEvent(selectedEvent.id)}>BLOQUEAR <i className="fi fi-br-ban mx-2 text-center"></i></button>
            ) :
              <button className='btn btn-success' type='button' onClick={() => confirmEnableEvent(selectedEvent.id)}>DESBLOQUEAR <i className='fi fi-br-check'></i></button>
            }
          </div>
        </div>
      </div>
    );
  };


  return (
    <div id="rootViewEvent">
      <NavBar />
      <div className='container-fluid animate__animated animate__fadeInDown' id='viewEventsContainer'>
        {!selectedEvent ?
          <>
            <h1 id='viewEventsTitle'>GESTIÓN DE EVENTOS</h1>
            <hr className='border-danger border-2 opacity-75' />
          </>
          :
          <>
            <button className='btn btn-link' onClick={() => setSelectedEvent(null)}><i className="fi fi-ss-circle-x"></i></button>

            <div className='row'>
              <div className='col-12'>
                <h1 id='viewEventsTitle'>DETALLE DEL EVENTO</h1>
              </div>
              <hr className="border-danger border-2 opacity-75" />
            </div>
          </>
        }

        {isLoading ? (
          <div className='text-center' id='loadingViewEvent'>
            <BeatLoader color='#000' size={15} />
          </div>
        ) : (
          <>
            {selectedEvent ? (
              renderEventDetails()
            ) : (
              events.length === 0 ? (
                <div className="row text-center" id="noEventsMessage">
                  <div className="col-12 mx-auto">
                    <p id='noEvent'>NO TIENES EVENTOS DISPONIBLES, VAMOS A CREAR UNO <a href="/newEvent" className="btn btn-outline-primary">
                      CREAR <i className="fi fi-sr-arrow-alt-square-right"></i>
                    </a></p>
                  </div>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    className={event.eventNonLocked ? 'card bg-transparent' : 'locked-event'}
                    id='newEventCardHorizontal'
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className='row g-0' id='newEventCardContent'>
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

                      <div className='col-md-10' id='newEventCardBody'>
                        <div className='card-body'>
                          <h2 className='card-title m-0' id='newEventCardTitle'>
                            {event.name.toUpperCase()}
                          </h2>
                          <p className='card-text m-0' id='newEventCardText'>
                            Tendra lugar el <Moment format='D [de] MMMM [de] YYYY'>{event.date}</Moment> a partir de las <Moment format='HH:mm'>{event.date}</Moment>
                          </p>
                          <p className='card-text m-0' id='newEventCardText'>
                            {event.address} - {event.municipe.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewEvents;
