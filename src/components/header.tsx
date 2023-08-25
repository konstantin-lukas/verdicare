import React from 'react';
import logo from '../media/verdicare.svg'
import './header.scss';
export default function Header() {
    return (
        <header>
            <a href="/">
                <img src={logo} alt="Verdicare"/>
            </a>
            <div>
                <input type="text" name="search"/>
                <span>UGHWAUHGWIU</span>
            </div>
        </header>
    );
}