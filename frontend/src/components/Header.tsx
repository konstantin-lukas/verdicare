import React, {useState, useContext, FormEvent} from 'react';
import {
    LanguageContext,
    SetLanguageContext,
    languages,
    SetQueryContext,
    SetIsTypingContext
} from '../App';
import logo from '../media/verdicare.svg'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import './Header.scss';
import {Link, useNavigate} from "react-router-dom";

function Languages({closeMenuCallback}: {closeMenuCallback:() => void}) {
    const currentLang = useContext(LanguageContext);
    const setCurrentLang = useContext(SetLanguageContext);
    const listItems = languages.filter(lang => {
        return lang.lang !== currentLang.lang;
    }).map(lang => {
        return (
            <li key={lang.flag} data-testid={lang.flag} className="flagWrapper" onClick={() => {
                setCurrentLang(lang);
                closeMenuCallback();
            }}>
                <span className={`fi fi-${lang.flag} fis`}></span>
            </li>
        );
    });
    return <>{listItems}</>;
}

function SearchInput({language}: {language: string}) {
    let placeholder: string;
    const navigate = useNavigate();
    const setQuery = useContext(SetQueryContext);
    const isTyping = useContext(SetIsTypingContext);
    const [typingTimeout, setTypingTimeout] = useState<null | NodeJS.Timeout>(null);

    switch (language) {
        case 'bg':
            placeholder = 'Търсете растение';
            break;
        case 'cs':
            placeholder = 'Hledejte rostlinu';
            break;
        case 'da':
            placeholder = 'Søg efter en plante';
            break;
        case 'de':
            placeholder = 'Suche nach einer Pflanze';
            break;
        case 'el':
            placeholder = 'Ψάξτε για φυτό';
            break;
        case 'en-gb':
        case 'en-us':
            placeholder = 'Look for a plant';
            break;
        case 'es':
            placeholder = 'Busca una planta';
            break;
        case 'et':
            placeholder = 'Otsige taime';
            break;
        case 'fi':
            placeholder = 'Etsi kasvia';
            break;
        case 'fr':
            placeholder = 'Cherchez une plante';
            break;
        case 'hu':
            placeholder = 'Keresse növény';
            break;
        case 'id':
            placeholder = 'Cari tanaman';
            break;
        case 'it':
            placeholder = 'Cerca una pianta';
            break;
        case 'ja':
            placeholder = '植物を検索';
            break;
        case 'ko':
            placeholder = '식물 찾기';
            break;
        case 'lt':
            placeholder = 'Ieškokite augalo';
            break;
        case 'lv':
            placeholder = 'Meklējiet augu';
            break;
        case 'nb':
            placeholder = 'Søk etter en plante';
            break;
        case 'nl':
            placeholder = 'Zoek een plant';
            break;
        case 'pl':
            placeholder = 'Szukaj rośliny';
            break;
        case 'pt-br':
        case 'pt-pt':
            placeholder = 'Procure por uma planta';
            break;
        case 'ro':
            placeholder = 'Căutați o plantă';
            break;
        case 'ru':
            placeholder = 'Ищите растение';
            break;
        case 'sk':
            placeholder = 'Hľadajte rastlinu';
            break;
        case 'sl':
            placeholder = 'Poiščite rastlino';
            break;
        case 'sv':
            placeholder = 'Sök efter en växt';
            break;
        case 'tr':
            placeholder = 'Bir bitki arayın';
            break;
        case 'uk':
            placeholder = 'Шукайте рослину';
            break;
        case 'zh':
            placeholder = '寻找植物';
            break;
        default:
            placeholder = 'Look for a plant';
            break;
    }

    const handleInput = (e: FormEvent) => {
        setQuery((e.target as HTMLInputElement).value);
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            setTypingTimeout(null);
        }
        isTyping(true);
        setTypingTimeout(setTimeout(() => {
            isTyping(false);
            navigate("/");
        }, 650));
    }

    return <input type="text" name="search" placeholder={placeholder} onInput={handleInput}/>;
}
export default function Header() {

    const language = useContext(LanguageContext);
    let [langSelectOpen, setLangSelectOpen] = useState<boolean>(false);
    function toggleMenu() {
        setLangSelectOpen(!langSelectOpen);
    }
    function closeMenu() {
        setLangSelectOpen(false);
    }

    document.addEventListener('mousedown', e => {
        const elem = document.querySelector('#languageMenu');
        if (elem && e.target instanceof Element && elem !== e.target && !elem.contains(e.target)) {
            e.stopPropagation();
            setLangSelectOpen(false);
        }
    });

    return (
        <header>
            <Link to="/">
                <img src={logo} alt="Verdicare"/>
            </Link>
            <div>
                <div className="searchWrapper">
                    <SearchInput language={language.lang}/>
                    <HiMiniMagnifyingGlass className="searchIcon"/>
                </div>
                <div id="languageMenu">
                    <span className="flagWrapper" onClick={toggleMenu}>
                        <span className={`selectedLanguage fi fi-${language.flag} fis`}></span>
                    </span>
                    <div className={`languageSelect${langSelectOpen ? ' showLangSelect' : ''}`}>
                        <ul>
                            <Languages closeMenuCallback={closeMenu}/>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}