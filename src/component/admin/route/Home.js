import React from 'react';
import Footer from '../../common/Footer';
import NavBar from '../../common/NavBar';
import article1 from '../image/article1.webp';
import article3 from '../image/article3.webp';
import article4 from '../image/article4.webp';
import club from '../image/club.webp';
import conference from '../image/conference.webp';
import festival from '../image/festival.webp';
import more from '../image/more.webp';
import sport from '../image/sport.webp';
import '../style/Home.css';


const Home = () => {
    return (
        <>
            <NavBar />
            <div id='homeContainer'>
                <div className='container-fluid text-center' id='homeFirstSection'>
                    <div className='row justify-content-center'>
                        <span className='col-8' id='homeFirstSectionTitle' >DISFRUTA Y SIENTE LOS MEJORES EVENTOS</span>
                    </div>
                </div>

                <div className='container-fluid text-start' id='homeSecondSection'>
                    <div className='row'>
                        <span className='col-12' id='homeSecondSectionText1'>La herramienta que te falta si eres organizador</span>
                        <span className='col-12' id='homeSecondSectionText2'>TICKET WEB ES IDEAL TANTO PARA PARTICULARES O EMPRESAS DE CUALQUIER TAMAÑO</span>
                    </div>
                </div>


                <div className='horizontal-cards' id='homeContainerHorizontalCards'>
                    <div className='scrolling-wrapper-flexbox' id='homeContainerScrollCards'>
                        <div className='card' id='homeCard'>
                            <div className='face front'>
                                <img src={festival} alt='' />
                                <h3>FESTIVALES MUSICALES</h3>
                            </div>

                            <div className='face back'>
                                <h3>FESTIVALES MUSICALES</h3>
                                <ul>
                                    <li>Microsite de venta propio</li>
                                    <li>Preventa de entradas en línea</li>
                                    <li>Facil gestión de eventos y entradas</li>
                                    <li>Pasarela de pago</li>
                                </ul>
                            </div>
                        </div>

                        <div className='card' id='homeCard'>
                            <div className='face front'>
                                <img src={club} alt='' />
                                <h3>CLUBES Y CONCIERTOS</h3>
                            </div>

                            <div className='face back'>
                                <h3>CLUBES Y CONCIERTOS</h3>
                                <ul>
                                    <li>Fácil gestión de eventos y entradas</li>
                                    <li>Pasarela de pago</li>
                                    <li>Entradas con formato QR validable</li>
                                    <li>Los mejores precios del mercado</li>
                                </ul>
                            </div>
                        </div>

                        <div className='card' id='homeCard'>
                            <div className='face front'>
                                <img src={sport} alt='' />
                                <h3>EVENTOS DEPORTIVOS</h3>
                            </div>

                            <div className='face back'>
                                <h3>EVENTOS DEPORTIVOS</h3>
                                <ul>
                                    <li>Venta de entradas en linea</li>
                                    <li>Posibilidad de poder compartir el trabajo en equipo</li>
                                    <li>Servicio integral de atención al cliente</li>
                                </ul>
                            </div>
                        </div>

                        <div className='card' id='homeCard'>
                            <div className='face front'>
                                <img src={conference} alt='' />
                                <h3>CONFERENCIAS</h3>
                            </div>

                            <div className='face back'>
                                <h3>CONFERENCIAS</h3>
                                <ul>
                                    <li>Posibilidad de ponerse en primer plano</li>
                                    <li>Control de aforo y pago seguro</li>
                                    <li>Si tiene algo que decirle al mundo, este es su sitio</li>
                                </ul>
                            </div>
                        </div>

                        <div className='card' id='homeCard'>
                            <div className='face front'>
                                <img src={more} alt='' />
                                <h3>Y MUCHO MÁS...</h3>
                            </div>

                            <div className='face back'>
                                <h3>Y MUCHO MÁS...</h3>
                                <ul>
                                    <li>Parques de Ocio y Atracciones</li>
                                    <li>Castillos y Palacios</li>
                                    <li>Talleres</li>
                                    <p>Permitanos ofrecerle el mejor servicio para cualquier tipo de evento que organice.</p>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-fluid text-start' id='homeThirdSection'>
                    <div className='row'>
                        <span className='col-12' id='homeThirdSectionText1'>¿Cómo funcionamos?</span>
                        <span className='col-12' id='homeThirdSectionText2'>TRÁMITES RÁPIDOS Y SENCILLOS SIN NINGUN TIPO DE COMPLICACIÓN</span>
                    </div>
                </div>

                <div className='container-fluid'>
                    <div className='row justify-content-around text-center' id='homeInfoSection'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <p className='article-title' id='homeArticleTitle'>Crea el evento y sus entradas</p>
                            <p className='article-body' id='homeArticleBody'>Puedes crear el evento de manera muy rápida y
                                empezar a vender entradas de forma inmediata. Gestiona tu mismo el proceso sin necesidad de papeleo</p>
                            <div className='row justify-content-center m-3'>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>FÁCIL</p>
                                </div>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>AUTOSERVICIO</p>
                                </div>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>EN 5 MINUTOS</p>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <img src={article1} alt='...' id='article1-img' />
                        </div>
                    </div>

                    <div className='row justify-content-around text-center' id='homeInfoSection'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <p className='article-title' id='homeArticleTitle'>Visualiza tus estadísticas</p>
                            <p className='article-body' id='homeArticleBody'>Sigue las estadísticas y los datos de las ventas. Ayuda para reflexionar, cambiar precios o pensar en diferentes estratégias. Ofrecerá a sus usuarios una mejor experiencia.</p>
                            <div className='row justify-content-center m-3'>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>TIEMPO REAL</p>
                                </div>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>DATOS CLAROS</p>
                                </div>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>ANÁLISIS</p>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <img src={article3} alt='...' id='article3-img' />
                        </div>
                    </div>

                    <div className='row justify-content-around text-center reverse' id='homeInfoSection'>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <p className='article-title' id='homeArticleTitle'>Acelerar el registro de visitantes</p>
                            <p className='article-body' id='homeArticleBody'>Facilitamos la posibilidad de descargar cualquier entrada de cualquier evento con el QR correspondiente. Registro impecable sin necesidad de hacer cola</p>
                            <div className='row justify-content-center m-3'>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>REGISTRO RAPIDO</p>
                                </div>
                                <div className='col-auto'>
                                    <p className=' article-check' id='homeArticleCheck'><i className='fi fi-ts-comment-alt-check m-2'></i>VENTA DE TAQUILLA</p>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                            <img src={article4} alt='...' id='article4-img' />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    );
}

export default Home;