import express, { Request, Response } from "express";
import 'dotenv/config';
const router = express.Router();


router.get('/search/:page/:query', (req: Request, res: Response) => {
    res.type('json');
    let searchString = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`;
    searchString +=`&page=${req.params.page}`;
    searchString +=`&q=${req.params.query}`;
    const mock =
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
                name: 'Jupiter Fly Trap Very Cool and Long',
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

    res.send(mock);
})
export default router;
