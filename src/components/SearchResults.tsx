import React from 'react';
export interface searchResult {
    name: string,
    latinName: string,
    image: string
}
function SearchResult(sr: searchResult) {
    return (
        <li>
            {sr.name}
        </li>
    );
}

export default function SearchResults() {
    const mock: searchResult[] =
        [
            {
                name: 'Venus Fly Trap',
                latinName: 'Dionaea muscipula \'Cup-shaped\'',
                image: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg'
            }
        ];
    const results = mock.map(sr => SearchResult(sr));
    return <ul>{results}</ul>;
}