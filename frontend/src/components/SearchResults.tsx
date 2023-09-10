import React, { useState, useRef, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import './SearchResults.scss';
import {Link} from "react-router-dom";
export interface searchResult {
    id: number,
    name: string,
    scientificName: string,
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
            <span ref={headingRef} title={sr.name} className="extraSpace searchResultHeading scrollingHeading">{sr.name}</span>
        </Marquee>) :
        (<span ref={headingRef} title={sr.name} className={
            isHeadingOverflowing ? "searchResultHeading overflowingGradient" : "searchResultHeading "
        }>{sr.name}</span>);

    const subheading = isSubheadingOverflowing && scrollHeading ?
        (<Marquee gradientWidth={10} gradient={true} className="searchResultSubheading">
            <span ref={subheadingRef} title={sr.scientificName} className="extraSpace">{sr.scientificName} </span>
        </Marquee>) :
        (<span ref={subheadingRef} title={sr.scientificName} className={
            isSubheadingOverflowing ? "searchResultSubheading overflowingGradient" : "searchResultSubheading"
        }>{sr.scientificName}</span>);


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

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + '/api/search/1/venus')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const copy = results.map(a => {return {...a}}).concat(data);
                setResults(copy);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const html = results.map(sr => (
        <SearchResult key={sr.id} id={sr.id} name={sr.name} scientificName={sr.scientificName} image={sr.image}/>
    ));
    return <ul id="searchResults">{html}</ul>;
}