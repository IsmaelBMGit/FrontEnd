import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { user } from '../../../service/UserService';
import micro from '../image/micro.jpg';
import '../style/CompanyEvents.css';


const CompanyEvents = ({ selectedCompany, fullName }) => {
  const [provinces, setProvinces] = useState([]);
  const [municipes, setMunicipes] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipe, setSelectedMunicipe] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [userRol, setUserRol] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);



  useEffect(() => {
    const getUserByRol = async () => {
      try {
        const response = await user.currentUser();
        setUserRol(response.data.rol[0]);

      } catch (error) {
        console.log(error);
      }
    };
    getUserByRol();
  }, []);

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

  useEffect(() => {
    const getEventsByCompany = async () => {
      if (selectedCompany) {
        try {
          const response = await user.getEventsByCompany(selectedCompany);
          const allEvents = response.data;

          setEvents(allEvents);
          setFilteredEvents(allEvents);

          if (allEvents.length === 0) {
            Swal.fire({
              title: 'INFORMACIÓN',
              text: 'ESTA EMPRESA NO TIENE EVENTOS DISPONIBLES',
              icon: 'info',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getEventsByCompany();
  }, [selectedCompany]);


  const confirmDisableEvent = (idEvent) => {
    Swal.fire({
      title: '¿ESTAS SEGURO?',
      text: 'SE BLOQUEARÁ EL EVENTO Y NO ESTARÁ DISPONIBLE',
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
      text: 'SE ACTIVARÁ DE NUEVO EL EVENTO Y VOLVERÁ A ESTAR DISPONIBLE',
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
      Swal.fire('ÉXITO', 'EL EVENTO HA SIDO HABILITADO NUEVAMENTE', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };


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

  const showEventDetails = (event) => {
    Swal.fire({
      title: 'DETALLES DEL EVENTO',
      html: `
        <div class="swal-content">
          <div>
            <label class="swal-label">EVENTO :</label>
            <span class="swal-value">${event.name}</span>
          </div>
          <div>
            <label class="swal-label">DIRECCIÓN :</label>
            <span class="swal-value">${event.address} - ${event.municipe.name}</span>
          </div>
          <div>
            <label class="swal-label">FECHA :</label>
            <span class="swal-value">${event.date}</span>
          </div>
          <br>
          <div><span class="swal-label">ACCIONES DISPONIBLES</span></div>
        </div>
      `,
      icon: 'info',
      showCancelButton: event.eventNonLocked ? true : false,
      confirmButtonText: event.eventNonLocked ? 'BLOQUEAR <i class="fi fi-br-ban mx-2 text-center"></i>' : 'DESBLOQUEAR',
      confirmButtonColor: event.eventNonLocked ? 'red' : 'green',
      cancelButtonText: event.eventNonLocked ? 'ENTRADAS VENDIDAS <i class="fi fi-rs-ticket-alt"></i>' : '',
      showCloseButton: true,
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html-container',
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
        closeButton: 'swal-close-button',
        content: 'swal-content',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (event.eventNonLocked) {
          confirmDisableEvent(event.id);
        } else {
          confirmEnableEvent(event.id)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if (event.eventNonLocked) {
          handleSell(event.id);
        }
      }
    });
  };

  const handleSell = async (idEvent) => {
    try {
      const response = await user.getSoldTickets(idEvent);
      const soldTickets = response.data;

      if (soldTickets > 0) {
        Swal.fire({
          icon: 'success',
          title: 'CONSULTAR ENTRADAS',
          html: `<p class="fw-bold">ENTRADAS VENDIDAS <i class="fi fi-rr-right"></i><span style="font-size: 2em; margin-left:5px;">${soldTickets}</span></p>`,
        });
      } else {
        Swal.fire({
          title: 'INFORMACIÓN',
          text: 'AL PARECER NO SE HA VENDIDO NINGUNA ENTRADA',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (events.length === 0) {
    return null;
  }

  if (userRol === 'ADMIN') {
    return (
      <>
        <div className='container-fluid animate__animated animate__fadeIn' id='eventContainer'>
          <div className='row pt-3'>
            <div className='col-md-12'>
              <h2 className='text-center'>
                EMPRESA <span className='company-fullname'>{fullName.toUpperCase()}</span>
              </h2>
            </div>
          </div>

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
              <select className='form-select' id='form-control'
                value={selectedMunicipe}
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

          <div className={!selectedCompany ? 'd-none' : 'd-block mb-5'} id='containerEventCard'>
            {filteredEvents.map((event) => (
              <div
                className={event.eventNonLocked ? 'card' : 'locked-event'}
                id='eventCardHorizontal'
                key={event.id}
                onClick={() => showEventDetails(event)}
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
                      <h3 className='card-title m-auto' id='eventCardTitle'>
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
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default CompanyEvents;
