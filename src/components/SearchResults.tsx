import React, { useState, useRef, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import './SearchResults.scss';
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
        (<Marquee gradientWidth={10} gradient={true} className="searchResultHeading">
            <span ref={headingRef} title={sr.name} className="extraSpace">{sr.name}</span>
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
        <li className="searchResult" key={sr.id} onMouseOver={() => {
            setScrollHeading(true);
        }} onMouseLeave={() => {
            setScrollHeading(false);
        }}>
            <a href={`/plant/${sr.id}`}>
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
            </a>
        </li>
    );
}

export default function SearchResults() {
    const mock: searchResult[] =
        [
            {
                id: 25,
                name: 'Venus Fly Trap',
                scientificName: 'Dionaea muscipula \'Cup-shaped\'',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            },
            {
                id: 24,
                name: 'Venus Fly Trap',
                scientificName: 'Dionaea muscipula \'Cup-shaped\'',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            },
            {
                id: 59,
                name: 'Venus Fly Trap Very Cool and Long',
                scientificName: 'Dionaea muscipula \'Cup-shaped\' also very cool and very loooong',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            },
            {
                id: 42,
                name: 'Venus Fly Trap',
                scientificName: 'Dionaea muscipula \'Cup-shaped\'',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            },
            {
                id: 242,
                name: 'Venus Fly Trap',
                scientificName: 'Dionaea muscipula \'Cup-shaped\'',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            }
        ];
    const results = mock.map(sr => SearchResult(sr));
    return <ul id="searchResults">{results}</ul>;
}