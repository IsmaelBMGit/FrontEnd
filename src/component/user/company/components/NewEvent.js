import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { user } from '../../../../service/UserService';
import Footer from '../../../common/Footer';
import NavBar from '../../../common/NavBar';
import '../style/NewEvent.css';

const NewEvent = () => {

    const [provinces, setProvinces] = useState([]);
    const [municipes, setMunicipes] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipe, setSelectedMunicipe] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');


    const navigate = useNavigate();


    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
    }      

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }



const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMunicipe !== '') {
        const formattedDate = moment(date).format('d/MM/yyyy HH:mm');
  
        user.createNewEvent(name, address, imageUrl, formattedDate, price, selectedMunicipe)
          .then(() => {
            swal({
              title: "ÉXITO",
              text: "EL EVENTO SE HA CREADO CORRECTAMENTE",
              icon: "success",
              button: "OK",
            }).then(() => {
              navigate("/home");
            });
          })
  
      } else {
        swal({
          title: "ERROR",
          text: "POR FAVOR, COMPLETA TODOS LOS CAMPOS DEL FORMULARIO",
          icon: "error",
          button: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  

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

    return (
        <div id='rootNewEvent'>
            <NavBar />
            <div className='container-fluid animate__animated animate__zoomIn' id='newEventContainer'>
                <div className='row mb-3' id='rowNewEvent'>
                    <div className='col-md-12'>
                        <h1 id='newEventTitle'>REGISTRO DE EVENTOS</h1>
                        <hr className='border-danger border-2 opacity-75' />
                    </div>
                </div>

                <div className='row mb-3 pt-3' id='rowNewEvent'>
                    <div className='col-md-12'>
                        <label className='form-label'>NOMBRE DEL EVENTO</label>
                        <input type='text' className='form-control' id='form-control' placeholder='Ej: Entrada al Museo de Cera'onChange={handleName} />
                    </div>
                </div>

                <div className='row mb-3 pt-3' id='rowNewEvent'>
                    <div className='col-md-12'>
                        <label className='form-label'>DIRECCIÓN</label>
                        <input type='text' className='form-control' id='form-control' placeholder='Ej: Calle de las Delicias, 19' onChange={handleAddress} />
                    </div>
                </div>

                <div className='row mb-3 pt-3' id='rowNewEvent'>
                    <div className='col-md-6'>
                        <label className='form-label'>PORTADA</label>
                        <input type='text' className='form-control' id='form-control' onChange={handleImageUrl} />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label'>FECHA</label>
                        <input type='datetime-local' className='form-control' id='form-control' onChange={handleDate} />
                    </div>
                </div>

                <div className='row text-center pt-4' id='rowNewEvent'>
                    <p>SELECCIONE LA UBICACIÓN DEL EVENTO</p>
                </div>
                <div className='row mb-5 text-center' id='rowNewEvent'>
                    <div className={!selectedProvince ? 'col-md-6 mx-auto' : 'col-md-6'}>
                        <label className='form-label'>PROVINCIA</label>
                        <select
                            className='form-select' id='form-control'
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                        >
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id} id='newEventOptionProvince'>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={!selectedProvince ? 'd-none' : 'col-md-6'}>
                        <label className='form-label'>MUNICIPIO</label>
                        <select className='form-select' id='form-control' onChange={(e) => setSelectedMunicipe(e.target.value)}>
                            {municipes.map((municipe) => (
                                <option key={municipe.id} value={municipe.id} id='newEventOptionMunicipe'>
                                    {municipe.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row mt-4">
                        <div className="col-4 mx-auto">
                            <label className="col-form-label">PRECIO</label><input type="number" className="form-control" id='form-control' onChange={handlePrice}/>
                        </div>
                    </div>
                </div>

                <div className='row mb-3 pt-3' id='rowNewEvent'>
                    <div className="d-grid gap-2 col-md-6 mx-auto">
                        <button className="btn btn-primary" type="button" onClick={handleSubmit}>CREAR EVENTO</button>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default NewEvent;