import './App.css';
import { useEffect, useState } from 'react';
import Spinner from './Spinner.js';
import ErrorScreen from './ErrorScreen.js';
import DefaultProfilePicture from './images/default-profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendar, faCertificate, faEnvelope, faGraduationCap, faHouse, faMobile, faPhone, faSchool, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { faReact, faFontAwesome, faGithub, faHtml5, faCss3, faJs, faDocker, faLinkedin, faVuejs, faAngular } from '@fortawesome/free-brands-svg-icons'

function App() {
    const [isLoading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [user, setUser] = useState({});
    const [DOB, setDOB] = useState(Date);
    const [errorMsg, setErrorMsg] = useState("");
    const [showNav, setShowNav] = useState(false);
    function switchNav() {
        setShowNav(!showNav);
    }
    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch("https://randomuser.me/api/?nat=es", {
            "content-type": "application/json"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.error){
                setError(true);
                setErrorMsg("Error de API: '" + data.error + "'");
            }else{
                setUser(data.results[0]);
                setDOB(new Date(data.results[0].dob.date))
                document.title = "CV - " + data.results[0].name.first + " " + data.results[0].name.last;
            }
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setErrorMsg("Error de conexión al API: '" + err + "'");
            setLoading(false);
        });
    }, [setLoading, setUser, setDOB, setError, setErrorMsg]);
    return (
        isLoading ? <Spinner></Spinner> : 
        hasError ? <ErrorScreen msg={errorMsg}></ErrorScreen> :
        <div id="app-body" className='min-h-screen flex flex-col'>
            <header id='navbar' className='sticky top-0 left-0 right-0 z-50 bg-white flex justify-center items-center text-left text-gray-900 shadow-sm'>
                <div className='container mx-auto px-6 py-4 flex flex-row flex-wrap items-center justify-between'>
                    <a className='no-underline font-semibold text-2xl' href='/'>
                        <h3>
                            {user.name.first + " " + user.name.last}
                        </h3>
                    </a>
                    <button onClick={ switchNav } data-collapse-toggle='navbar-links' type='button' className='md:hidden' id='menu-toggle' aria-controls='navbar-links' aria-expanded={ showNav }><FontAwesomeIcon size="lg" icon={faBars}></FontAwesomeIcon></button>
                    <nav id='navbar-links' className={`${ showNav ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                        <div className='flex flex-col md:flex-row items-center md:items-baseline pt-4 md:pt-0 md:gap-5 text-sm text-center font-normal uppercase'>
                            <a className='nav-link' href='#aboutme'>
                                Sobre mi
                            </a>
                            <a className='nav-link' href='#information'>
                                Datos
                            </a>
                            <a className='nav-link' href='#contact'>
                                Contacto
                            </a>
                            <a className='nav-link' href='#education'>
                                Educación
                            </a>
                            <a className='nav-link' href='#skills'>
                                Habilidades
                            </a>
                            <a className='nav-link' href='#experience'>
                                Experiencia
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
            <div className='w-full flex flex-col bg-slate-50'>
                <div className='h-full container mx-auto px-6 md:px-20 py-8 gap-8 md:gap-4 grid auto-cols-fr grid-flow-row md:grid-flow-col'>
                    <div className='flex flex-col justify-center items-center md:items-start gap-4 text-gray-900 text-center md:text-left'>
                        <div className='gap-2'>
                            <p className='font-semibold text-lg'>Hola, yo soy</p>
                            <h1 className='font-semibold text-4xl'>{user.name.first + " " + user.name.last}</h1>
                        </div>
                        <h2 className='font-thin text-lg'>Web developer expert{ user.gender === "female" ? "a" : "o" } en React, Express, MongoDB, Laravel, etc.</h2>
                        <a id='aboutme-button' href='#aboutme' className='px-6 py-2 text-white font-medium text-xl'>
                            Sobre mi
                        </a>
                    </div>
                    <div className='w-full h-full px-6 md:px-initial flex justify-center items-center'>
                        <img id='photo' className='max-w-full h-auto object-center object-cover' src={user.picture.large || DefaultProfilePicture} alt='No se pudo cargar una imagen de perfil.'></img>
                    </div>
                </div>
            </div>
            <section id='content' className='flex-1 flex'>
                <div className='flex-1 container mx-auto px-6 md:px-20 py-12 divide-y divide-slate-300 divide-solid'>
                    <section id='aboutme'>
                        <h2 className='section-title'>Sobre Mi</h2>
                        <p className='border-l-2 border-sky-500 pl-6 py-8 font-light text-lg text-slate-600'>Soy un{ user.gender === "female" ? "a" : "" } desarrollador{ user.gender === "female" ? "a" : "" } web { user.gender === "female" ? "a la" : "al" } que le apasiona el diseño y la informática.</p>
                    </section>
                    <section id='information'>
                        <h2 className='section-title'>Datos de interés</h2>
                        <ul className='fa-ul text-lg tracking-wide font-light text-slate-800'>
                            <li><FontAwesomeIcon icon={ faHouse } listItem></FontAwesomeIcon> Dirección : { user.location.street.name + " " + user.location.street.number + ", " + user.location.city }</li>
                            <li><FontAwesomeIcon icon={ faVenusMars } listItem></FontAwesomeIcon> Género : { user.gender === "male" ? "Masculino" : "Femenino" }</li>
                            <li><FontAwesomeIcon icon={ faCalendar } listItem></FontAwesomeIcon> Edad : { user.dob.age } años</li>
                        </ul>
                    </section>
                    <section id='contact'>
                        <h2 className='section-title'>información de contacto</h2>
                        <ul className='fa-ul text-lg tracking-wide font-light text-slate-800'>
                            <li><FontAwesomeIcon icon={ faEnvelope } listItem></FontAwesomeIcon> Correo : <a href={ "mailto:"+user.email }>{ user.email }</a></li>
                            <li><FontAwesomeIcon icon={ faPhone } listItem></FontAwesomeIcon> Teléfono : { user.phone }</li>
                            <li><FontAwesomeIcon icon={ faMobile } listItem></FontAwesomeIcon> Celular : { user.cell }</li>
                        </ul>
                    </section>
                    <section id='education'>
                        <h2 className='section-title'>Educación</h2>
                        <ul className='fa-ul text-lg tracking-wide font-light text-slate-800'>
                            {user.dob.age >= 11 ? 
                                <li>
                                    <FontAwesomeIcon icon={ faSchool } listItem></FontAwesomeIcon>
                                    <span>
                                        Escuela secundaria N°1 de { user.location.city } : { DOB.getFullYear()+11 } - { user.dob.age >= 18 ? DOB.getFullYear()+17 : "actualidad" }
                                    </span>
                                    <p className='text-slate-600 text-sm font-thin pl'>
                                        Bachiller técnico especializado en informática personal y profesional.
                                    </p>
                                </li> : ""
                            }
                            {user.dob.age >= 18 ? 
                                <li>
                                    <FontAwesomeIcon icon={ faGraduationCap } listItem></FontAwesomeIcon>
                                    <span>Universidad de { user.location.city } : { DOB.getFullYear()+18 } - { user.dob.age >= 25 ? DOB.getFullYear()+24 : "actualidad" }</span>
                                    <p className=' text-slate-600 text-sm font-thin pl'>
                                    Licenciatura en Cs. de la computación.
                                    </p>
                                </li> : ""
                            }
                            {user.dob.age >= 15 ? 
                                <li> <FontAwesomeIcon icon={ faCertificate } listItem></FontAwesomeIcon> Introducción al desarrollo Frontend: { Math.floor(Math.random() * ((new Date().getFullYear()) - (DOB.getFullYear()+15) + 1)) + DOB.getFullYear()+15 } </li> : ""
                            }
                        </ul>
                    </section>
                    <section id="skills">
                        <h2 className='section-title'>Habilidades</h2>
                        <div className='p-4 md:p-8 grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 text-center text-xl md:text-2xl text-gray-400'>
                            <div>
                                <FontAwesomeIcon icon={ faHtml5 } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>HTML</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faCss3 } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>CSS</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faJs } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>Javascript</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faGithub } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>Github</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faReact } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>React</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faVuejs } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>Vue</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faAngular } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>Angular</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faFontAwesome } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>FontAwesome</h4>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={ faDocker } size="2xl" fixedWidth></FontAwesomeIcon>
                                <h4>Docker</h4>
                            </div>
                        </div>
                    </section>
                    <section id='experience'>
                        <h2 className='section-title'>Experiencia</h2>
                        <div className='flex flex-col py-4 px-6 md:px-10'>
                            <div className='experience-entry' date-is='2017-2017'>
                                <h3 className='experience-entry-title'>Google - Frontend developer Jr.</h3>
                                <p>Encargado del mantenimiento del sitio.</p>
                            </div>
                            <div className='experience-entry' date-is='2018-2020'>
                                <h3 className='experience-entry-title'>Facebook - Frontend engineer.</h3>
                                <p>Participé en el crecimiento del sitio.</p>
                            </div>
                            <div className='experience-entry' date-is='2020-2022'>
                                <h3 className='experience-entry-title'>Microsoft - Frontend developer Ssr.</h3>
                                <p>Trabajé en el mantenimiento y diseño del buscador Bing.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <footer className='flex text-gray-400 font-light text-center md:text-left bg-slate-900 break-words'>
                <div className='container mx-auto px-5 md:px-14 py-12 md:24 flex flex-col gap-4 md:gap-6'>
                    <div className='grid auto-cols-fr grid-flow-row md:grid-flow-col gap-y-4 gap-x-14'>
                        <div className='flex flex-col gap-2 break-inside-avoid-column'>
                            <h4 className='text-gray-200 font-semibold text-lg'>Sobre esta página:</h4>
                            <p>Página creada para el proyecto final del curso "Introducción al desarrollo frontend". Creada con <FontAwesomeIcon icon={ faReact } /> React, TailwindCSS y <FontAwesomeIcon icon={ faFontAwesome } /> FontAwesome.</p>
                            <p>Hecho por Facundo Nicolás Mayol</p>
                        </div>
                        <div>
                            <h4 className='text-gray-200 font-semibold text-lg'>Utiliza un generador aleatorio de perfiles:</h4>
                            <p>Recargue la página para ver otro perfil. Esto no utiliza datos reales.</p>
                        </div>
                        <div>
                            <h4 className='text-gray-200 font-semibold text-lg'>Contacto con el desarrollador:</h4>
                            <div className='flex flex-row flex-wrap justify-center md:justify-start gap-2 p-2'>
                                <a href='https://github.com/3xi0' className='contact-icon' id='github'>
                                    <FontAwesomeIcon icon={ faGithub } size='2x' fixedWidth></FontAwesomeIcon>
                                </a>
                                <a href='https://www.linkedin.com/in/facundo-nicol%C3%A1s-mayol-7924371b8/' className='contact-icon' id='linkedin'>
                                    <FontAwesomeIcon icon={ faLinkedin } size='2x' fixedWidth></FontAwesomeIcon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
