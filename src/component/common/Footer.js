import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="container-fluid"  id='commonFooter'>
            <footer className='row justify-content-around'>
                <div className='col-auto text-center'>
                    <h4>&copy;TICKETWEB &nbsp;2023</h4>
                    <p id='commonFooterText'>Derechos de autor reservados</p>
                </div>
                <div className='col-auto text-center'>
                    <h4>SEGURIDAD</h4>
                    <p id='commonFooterText'><i className='fi fi-ss-shield-check'></i>Seguridad y privacidad de datos aseguradas</p>
                </div>
                <div className='col-auto text-center'>
                    <h4>MÉTODOS DE PAGO</h4>
                    <p id='commonFooterSectionPay'>
                        <i className='fi fi-brands-visa'></i>
                        <i className='fi fi-brands-paypal'></i>
                    </p>

                </div>
            </footer>
        </div>
    );
}

export default Footer;