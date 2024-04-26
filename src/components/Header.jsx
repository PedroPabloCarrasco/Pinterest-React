import React from 'react'
import Logo from './icons/Logo';

const Header = () => {
    return (
        <header>
            <ul>
               <li><a href=''><Logo/></a></li> 
               <li><a href=''>Inicio</a></li> 
               <li><a href=''>Hoy</a></li> 
               <li><a href=''>Crear</a></li> 
               <li><input type="search"/></li> 
               <li><a href=''>User</a></li> 
            </ul>
        </header>
    );
}

export default Header;