import React from 'react';
import logo from '../media/verdicare.svg'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import './header.scss';
export default function Header() {
    return (
        <header>
            <a href="/">
                <img src={logo} alt="Verdicare"/>
            </a>
            <div>
                <div className="searchWrapper">
                    <input type="text" name="search" placeholder="Look for a plant"/>
                    <HiMiniMagnifyingGlass className="searchIcon"/>
                </div>
                <span className="flagWrapper">
                    <span className="fi fi-gr fis"></span>
                </span>
            </div>
        </header>
    );
}