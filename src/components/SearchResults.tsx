import React from 'react';
import './SearchResults.scss';
export interface searchResult {
    id: number,
    name: string,
    scientificName: string,
    image: string
}
function SearchResult(sr: searchResult) {
    return (
        <li className="searchResult" key={sr.id}>
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
                    <span title={sr.name} className="searchResultHeading">{sr.name}</span>
                    <span title={sr.scientificName} className="searchResultSubheading">{sr.scientificName}</span>
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