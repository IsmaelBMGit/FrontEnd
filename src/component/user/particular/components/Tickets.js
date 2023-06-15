import jsPDF from 'jspdf';
import moment from 'moment';
import qrious from 'qrious';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { user } from '../../../../service/UserService';
import micro from '../../../admin/image/micro.jpg';
import Footer from '../../../common/Footer';
import NavBar from '../../../common/NavBar';
import '../style/Tickets.css';
import { BeatLoader } from 'react-spinners';


const Tickets = () => {

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    user
      .getTicketsToUser()
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false); // Finalizar carga
      });
  }, []);



  const showConfirmationAlert = (ticket) => {
    Swal.fire({
      title: '¿QUIERES DESCARGAR LA ENTRADA?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'DESCARGAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        generatePDF(ticket);
      }
    });
  };

  const generatePDF = (ticket) => {
    const doc = new jsPDF();

    // Configuración de la página
    const pageWidth = doc.internal.pageSize.getWidth();

    // Título del evento
    doc.setFontSize(20);
    doc.setFont("courier", "bolditalic");
    doc.text(ticket.event.name.toUpperCase(), pageWidth / 2, 10, { align: 'center' });

    // Imagen del ticket centrada en la parte superior
    if (ticket.imageUrl) {
      doc.addImage(ticket.imageUrl, 'JPEG', pageWidth / 2 - 50, 20, 100, 100);
    }


    // Datos del ticket
    doc.setFontSize(15);
    doc.text(`FECHA: ${moment(ticket.date).format('D [de] MMMM [de] YYYY')} DESDE LAS ${moment(ticket.date).format('HH:mm')}`, pageWidth / 2, 130, { align: 'center' });
    doc.text(`PRECIO: ${ticket.price}`, pageWidth / 2, 140, { align: 'center' });
    doc.text(`NÚMERO DE CUENTA: ${ticket.bankNumber}`, pageWidth / 2, 150, { align: 'center' });
    doc.text(`DIRECCIÓN: ${ticket.event.address}`, pageWidth / 2, 160, { align: 'center' });
    doc.text(`MUNICIPIO: ${ticket.event.municipe.name}`, pageWidth / 2, 170, { align: 'center' });
    doc.text(`NOMBRE: ${ticket.user.fullName}`, pageWidth / 2, 180, { align: 'center' });
    doc.text(`TELÉFONO: ${ticket.user.phone}`, pageWidth / 2, 190, { align: 'center' });
    doc.text(`EMAIL: ${ticket.user.email}`, pageWidth / 2, 200, { align: 'center' });

    // Código QR y texto en la misma línea
    const text = 'CÓDIGO QR PARA VALIDAR LA ENTRADA';
    const qrCodeSize = 70;

    // Obtener el ancho del texto
    const textWidth = doc.getTextWidth(text);

    // Calcular las coordenadas X para el texto y el código QR
    const startX = pageWidth / 2 - (textWidth + qrCodeSize) / 2;
    const qrCodeX = startX + textWidth;

    // Dibujar el texto y el código QR
    doc.text(text, startX, 240);

    const qrCode = new qrious({
      value: ticket.qrCode,
      size: qrCodeSize,
    });

    const qrCodeSVG = qrCode.toDataURL('image/svg+xml');
    const qrCodeY = 240 - qrCodeSize / 2;
    doc.addImage(qrCodeSVG, 'SVG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);

    const fileName = `${ticket.user.email}.pdf`;
    doc.save(fileName);
  };



  return (
    <div id='ticketsPageContainer'>
      <NavBar />
      <div className='container-fluid animate__animated animate__fadeInDown' id='viewTickets'>
        <h1 id='viewTicketsTitle'>MIS ENTRADAS</h1>
        <hr className='border-danger border-2 opacity-75' />
        {isLoading ? ( // Mostrar loader mientras se carga
        <div className='text-center' id='loadingViewEvent'>
            <BeatLoader color='#000' size={15} />
          </div>
        ) : tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              className='card mb-5'
              id='eventCardHorizontal'
              key={ticket.nticket}
              onClick={() => showConfirmationAlert(ticket)}

            >
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

                <div className='col-md-10' id='eventCardBody'>
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
          ))
        ) : (
          <div className='row mt-5'>
            <div className='col-12 text-center'>
              <p id='noTickets'>NO HAY ENTRADAS PARA MOSTRAR</p>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

export default Tickets;