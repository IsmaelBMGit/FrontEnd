import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { user } from '../../../service/UserService';
import Footer from '../../common/Footer';
import NavBar from '../../common/NavBar';
import '../style/Company.css';
import CompanyEvents from './CompanyEvents';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyFullName, setSelectedCompanyFullName] = useState('');


  const searchData = companies.filter((company) =>
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    const sortedData = [...companies];

    sortedData.sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setCompanies(sortedData);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const confirmDisableAccount = (companyId) => {
    Swal.fire({
      title: '¿ESTÁS SEGURO?',
      text: 'SE BLOQUEARÁ LA CUENTA DE LA EMPRESA',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'BLOQUEAR <i class="fi fi-br-ban mx-2 text-center"></i>',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        disableAccount(companyId);
      }
    });
  };

  const confirmEnableAccount = (companyId) => {
    Swal.fire({
      title: '¿DESBLOQUEAR EMPRESA?',
      text: 'SE ACTIVARÁ DE NUEVO LA CUENTA DE LA EMPRESA',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DESBLOQUEAR',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        enableAccount(companyId);
      }
    });
  };

  const disableAccount = async (companyId) => {
    try {
      await user.disableAccount(companyId);
      Swal.fire('ÉXITO', 'LA EMPRESA HA SIDO BLOQUEADA CORRECTAMENTE', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const enableAccount = async (companyId) => {
    try {
      await user.enableAccount(companyId);
      Swal.fire('ÉXITO', 'LA EMPRESA SE HA DESBLOQUEADO NUEVAMENTE', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await user.getAllCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCompanies();
  }, []);

  return (
    <>
      <NavBar />
      <div className='container-fluid animate__animated animate__bounceInDown' id='companyContainer'>
        <div className='row pt-3'>
          <div className='col-md-12'>
            <h2 className='text-center'>
              CONTROL DE EMPRESAS
            </h2>
          </div>
        </div>

        <div className='row d-flex justify-content-center align-items-center text-center pt-5 mb-5'>
          <label className='col-md-2 col-form-label'><i className="fi fi-ss-hand-back-point-right mx-2" id='handSearch'></i>  BUSQUEDA</label>
          <div className='col-md-8'>
            <input type='search' className='form-control' id='eventInputSearch' placeholder='Buscar' onChange={searchChange} />
          </div>
        </div>

        <div id='companyContainerTable'>
          <table className='table table-hover' id='companyTable'>

            <thead>
              <tr id='headCompanyTable'>
                <th onClick={() => handleSort('email')}>EMAIL</th>
                <th onClick={() => handleSort('fullName')}>NOMBRE DE LA EMPRESA</th>
                <th onClick={() => handleSort('phone')}>CONTACTO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {searchData.map((company) => (
                <tr key={company.email} className={company.accountNonLocked ? '' : 'blocked-row'}>
                  <td>{company.email}</td>
                  <td>{company.fullName}</td>
                  <td>{company.phone}</td>
                  <td id='tdOptions'>
                    <button
                      className={company.accountNonLocked ? 'btn btn-sm btn-info mx-2' : 'btn btn-sm btn-info mx-2 disabled'}
                      id='companyBtnEvents'
                      onClick={() => {
                        setSelectedCompany(company.idUser);
                        setSelectedCompanyFullName(company.fullName);
                      }}
                    >
                      <i className="fi fi-tr-calendar-star" id='iOptions'></i>
                    </button>

                    {company.accountNonLocked ? (
                      <button className='btn btn-sm btn-danger' onClick={() => confirmDisableAccount(company.idUser)}>
                        <i className='fi fi-br-ban' id='iDisabled'></i>
                      </button>
                    ) : (
                      <button className='btn btn-sm btn-success' onClick={() => confirmEnableAccount(company.idUser)}>
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
      {selectedCompany && <CompanyEvents selectedCompany={selectedCompany} fullName={selectedCompanyFullName} />}
      <Footer />
    </>
  );
};

export default Company;
