import React, {useState, useRef, useEffect, useContext} from 'react';
import {IsTypingContext, LanguageContext, QueryContext} from "../App";
import Marquee from "react-fast-marquee";
import './SearchResults.scss';
import {Link} from "react-router-dom";
export interface searchResult {
    id: number,
    common_name: string,
    scientific_name: string,
    image: string
}
function SearchResult(sr: searchResult) {
    const [isHeadingOverflowing, setIsHeadingOverflowing] = useState(false);
    const [isSubheadingOverflowing, setIsSubheadingOverflowing] = useState(false);
    const [scrollHeading, setScrollHeading] = useState(false);
    const headingRef = useRef<HTMLElement>(null);
    const subheadingRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (headingRef.current) {
            const headingElement = headingRef.current;
            const isOverflowing = headingElement.scrollWidth > headingElement.clientWidth;
            setIsHeadingOverflowing(isOverflowing);
        }
        if (subheadingRef.current) {
            const subheadingElement = subheadingRef.current;
            const isOverflowing = subheadingElement.scrollWidth > subheadingElement.clientWidth;
            setIsSubheadingOverflowing(isOverflowing);
        }
    }, []);

    const heading = isHeadingOverflowing && scrollHeading ?
        (<Marquee gradientWidth={10} gradient={true}>
            <span ref={headingRef} title={sr.common_name} className="extraSpace searchResultHeading scrollingHeading">{sr.common_name}</span>
        </Marquee>) :
        (<span ref={headingRef} title={sr.common_name} className={
            isHeadingOverflowing ? "searchResultHeading overflowingGradient" : "searchResultHeading "
        }>{sr.common_name}</span>);

    const subheading = isSubheadingOverflowing && scrollHeading ?
        (<Marquee gradientWidth={10} gradient={true} className="searchResultSubheading">
            <span ref={subheadingRef} title={sr.scientific_name} className="extraSpace">{sr.scientific_name} </span>
        </Marquee>) :
        (<span ref={subheadingRef} title={sr.scientific_name} className={
            isSubheadingOverflowing ? "searchResultSubheading overflowingGradient" : "searchResultSubheading"
        }>{sr.scientific_name}</span>);


    return (
        <li className="searchResult" onMouseOver={() => {
            setScrollHeading(true);
        }} onMouseLeave={() => {
            setScrollHeading(false);
        }}>
            <Link to={`/plant/${sr.id}`}>
                <div className="searchResultImageWrapper">
                    <span className="searchResultImage" style={
                        {
                            backgroundImage: `url(${sr.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }
                    }></span>
                </div>
                <div className="searchResultHeadingWrapper">
                    {heading}
                    {subheading}
                </div>
            </Link>
        </li>
    );
}

export default function SearchResults() {
    const [results, setResults] = useState<searchResult[]>([]);
    const [page, setPage] = useState<number>(1);
    const [blockFetch, setBlockFetch] = useState(false);
    const [nearBottom, setNearBottom] = useState(false);
    const [reachedEndOfContent, setReachedEndOfContent] = useState(false);
    const query = useContext(QueryContext);
    const isTyping = useContext(IsTypingContext);
    const language = useContext(LanguageContext);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            setNearBottom(scrollTop + windowHeight > totalHeight - (windowHeight / 2));
        });
    }, []);
    useEffect(() => {
        if (blockFetch || isTyping) return;
        setBlockFetch(true);
        setResults([]);
        const q = /^\s*$/.test(query) ?
            `/api/search/${encodeURIComponent(language.lang)}/${encodeURIComponent(page)}` :
            `/api/search/${encodeURIComponent(language.lang)}/${encodeURIComponent(page)}/${encodeURIComponent(query)}`;
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + q)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setResults(data);
                setReachedEndOfContent(false);
                setPage(1);
                setBlockFetch(false);
            })
            .catch(() => {
                setBlockFetch(false);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTyping, language]);
    useEffect(() => {
        if (blockFetch || !nearBottom || reachedEndOfContent) return;
        setBlockFetch(true);
        const q = /^\s*$/.test(query) ?
            `/api/search/${encodeURIComponent(language.lang)}/${encodeURIComponent(page + 1)}` :
            `/api/search/${encodeURIComponent(language.lang)}/${encodeURIComponent(page + 1)}/${encodeURIComponent(query)}`;

        fetch(process.env.REACT_APP_BACKEND_ADDRESS + q)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.length === 0) {
                    setReachedEndOfContent(true);
                } else {
                    const copy = results.map(a => {return {...a}}).concat(data);
                    setResults(copy);
                    setPage(page + 1);
                }
                setBlockFetch(false);
            })
            .catch(() => {
                setBlockFetch(false);
            });
    }, [nearBottom]);
    if (results.length === 0)
        return(<ul id="searchResults" className="singleElement">
            <li>
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading"/>
            </li>
        </ul>);
    const html = results.map(sr => {
        return <SearchResult key={sr.id} id={sr.id} common_name={sr.common_name} scientific_name={sr.scientific_name} image={sr.image}/>
    });
    if (html.length === 1)
        return <ul id="searchResults" className="singleElement">{html}</ul>;
    if (html.length === 2)
        return <ul id="searchResults" className="doubleElement">{html}</ul>
    return <ul id="searchResults">{html}</ul>;
}