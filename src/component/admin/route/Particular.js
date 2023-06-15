import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { user } from '../../../service/UserService';
import Footer from '../../common/Footer';
import NavBar from '../../common/NavBar';
import micro from '../image/micro.jpg';
import '../style/Particular.css';



const Particular = () => {

  const [particulars, setParticulars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [tickets, setTickets] = useState([]);
  const [selectedParticular, setSelectedParticular] = useState(null);
  const [showTickets, setShowTickets] = useState(false);




  const handleSort = (key) => {

    const sortedData = [...particulars];

    sortedData.sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setParticulars(sortedData);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  }

  const searchData = particulars.filter((particular) =>
    particular.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    particular.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    particular.phone.toString().toLowerCase().includes(searchTerm.toLowerCase()));


  const handlesearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const confirmDisableAccount = (particularId) => {
    Swal.fire({
      title: '¿ESTÁS SEGURO?',
      text: 'SE BLOQUEARÁ LA CUENTA DEL USUARIO',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'BLOQUEAR <i class="fi fi-br-ban mx-2 text-center"></i>',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        disableAccount(particularId);
      }
    });
  };

  const confirmEnableAccount = (particularId) => {
    Swal.fire({
      title: '¿DESBLOQUEAR USUARIO',
      text: 'SE ACTIVARÁ LA CUENTA DE USUARIO NUEVAMENTE',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DESBLOQUEAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        enableAccount(particularId);
      }
    });
  };

  const disableAccount = async (particularId) => {
    try {
      await user.disableAccount(particularId);
      Swal.fire('ÉXITO', 'EL USUARIO HA SIDO BLOQUEADO CORRECTAMENTE', 'success').then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.log(error);
    }
  };

  const enableAccount = async (particularId) => {
    try {
      await user.enableAccount(particularId);
      Swal.fire('ÉXITO', 'SE HA HABILITADO DE NUEVO LA CUENTA DE USUARIO', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllParticulars = async () => {
      try {
        user.getAllParticulars().then((response => {
          setParticulars(response.data);
        }))
      } catch (error) {
        console.log(error);
      }
    }
    getAllParticulars();
  }, []);


  useEffect(() => {
    const ticketsFromUser = async () => {
      if (selectedParticular) {
        try {
          const response = await user.ticketsFromUserId(selectedParticular);
          setTickets(response.data);

          if (response.data.length > 0) {
            setShowTickets(true);
          } else {
            setShowTickets(false);
            Swal.fire({
              title: 'INFORMACIÓN',
              text: 'ESTA USUARIO NO TIENE ENTRADAS COMPRADAS',
              icon: 'info',
              confirmButtonText: 'OK',
            });
          }

        } catch (error) {
          console.log(error);
        }
      }
    };

    ticketsFromUser();
  }, [selectedParticular]);



  return (
    <>
      <NavBar />
      <div className='container-fluid animate__animated animate__fadeInDown' id='particularContainer'>
        <div className='row pt-3'>
          <div className='col-md-12'>
            <h1 className='text-center'>
              CONTROL DE PARTICULARES
            </h1>
          </div>
        </div>

        <div className='row g-0 d-flex justify-content-center align-items-center text-center pt-5 mb-5'>
          <label className='col-md-2 col-form-label'><i className="fi fi-ss-hand-back-point-right" id='handSearch'></i> BUSQUEDA</label>
          <div className='col-md-8'>
            <input type='search' className='form-control' id='eventInputSearch' placeholder='Buscar un evento' onChange={handlesearchChange} />
          </div>
        </div>

        <div id='particularContainerTable'>
          <table className='table table-hover' id='particularTable'>
            <thead>
              <tr>
                <th onClick={() => handleSort('email')}>EMAIL</th>
                <th onClick={() => handleSort('fullName')}>NOMBRE Y APELLIDOS</th>
                <th onClick={() => handleSort('phone')}>CONTACTO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((particular) => (
                <tr key={particular.email} className={particular.accountNonLocked ? '' : 'blocked-row'}>
                  <td>{particular.email}</td>
                  <td>{particular.fullName}</td>
                  <td>{particular.phone}</td>
                  <td className='actions'>

                    <button
                      className={particular.accountNonLocked ? 'btn btn-sm btn-info mx-2' : 'btn btn-sm btn-info mx-2 disabled'}
                      onClick={() =>
                        setSelectedParticular(particular.idUser)}>
                      <i className="fi fi-rs-ticket-alt" id='iOptions'></i>
                    </button>


                    {particular.accountNonLocked ? (
                      <button className='btn btn-sm btn-danger' onClick={() => confirmDisableAccount(particular.idUser)}>
                        <i className='fi fi-br-ban' id='iDisabled'></i>
                      </button>
                    ) : (
                      <button className='btn btn-sm btn-success' onClick={() => confirmEnableAccount(particular.idUser)}>
                        <i className='fi fi-br-check' id='iEnabled'></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showTickets && (

        <div className='container-fluid animate__animated animate__fadeInDown' id='particularContainer'>
          <h1 id='viewTicketsTitle'>{selectedParticular && particulars.find(particular => particular.idUser === selectedParticular)?.fullName.toUpperCase()}</h1>

          {tickets.map((ticket) => (
            <div className='card mb-5' id='eventCardHorizontal' key={ticket.nticket}>
              <div className='row g-0' id='eventCardContent'>
                <div className='col-md-2'>
                  {ticket.imageUrl ? (
                    <img
                      src={ticket.imageUrl}
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

                <div className='col-md-10' id='ticketCardContent'>
                  <div className='card-body'>
                    <h2 className='card-title m-0' id='newEventCardTitle'>
                      {ticket.event.name.toUpperCase()}
                    </h2>
                    <p className='card-text m-0' id='newEventCardText'>
                      Tendra lugar el <Moment format='D [de] MMMM [de] YYYY'>{ticket.date}</Moment> a partir de las <Moment format='HH:mm'>{ticket.date}</Moment>
                    </p>
                    <p className='card-text m-0' id='newEventCardText'>
                      {ticket.event.address} - {ticket.event.municipe.name}
                    </p>
                    <p className='card-text m-0' id='newEventCardText'>
                      Precio : {ticket.price}€
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>

  );
}

export default Particular;

