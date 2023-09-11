import express, { Request, Response } from "express";
import 'dotenv/config';
const router = express.Router();

router.get('/details/:id', (req: Request, res: Response) => {
    res.type('json');

    const detailsResponse = {"id":69,"common_name":"Kandy Kitchen Japanese Maple","scientific_name":["Acer palmatum 'Kandy Kitchen'"],"other_name":[],"family":null,"origin":["Japan"],"type":"tree","dimension":"Height:  6 feet","dimensions":{"type":"Height","min_value":6,"max_value":6,"unit":"feet"},"cycle":"Perennial","attracts":[],"propagation":["Grafting Propagation","Cutting","Layering Propagation","Air Layering Propagation","Root Division"],"hardiness":{"min":"5","max":"5"},"hardiness_location":{"full_url":"https:\/\/perenual.com\/api\/hardiness-map?species_id=69&size=og&key=sk-QB8564e204a7366e81934","full_iframe":"<iframe frameborder=0 scrolling=yes seamless=seamless width=1000 height=550 style='margin:auto;' src='https:\/\/perenual.com\/api\/hardiness-map?species_id=69&size=og&key=sk-QB8564e204a7366e81934'><\/iframe>"},"watering":"Average","depth_water_requirement":[],"volume_water_requirement":[],"watering_period":null,"watering_general_benchmark":{"value":"7-10","unit":"days"},"plant_anatomy":[],"sunlight":["full sun","part shade"],"pruning_month":["March","April","August","June","July","August"],"pruning_count":{"amount":1,"interval":"yearly"},"seeds":0,"maintenance":null,"care-guides":"http:\/\/perenual.com\/api\/species-care-guide-list?species_id=69&key=sk-QB8564e204a7366e81934","soil":[],"growth_rate":"Low","drought_tolerant":false,"salt_tolerant":false,"thorny":false,"invasive":false,"tropical":false,"indoor":false,"care_level":"Medium","pest_susceptibility":[],"pest_susceptibility_api":"Coming Soon","flowers":false,"flowering_season":null,"flower_color":"","cones":false,"fruits":false,"edible_fruit":false,"edible_fruit_taste_profile":"Coming Soon","fruit_nutritional_value":"Coming Soon","fruit_color":[],"harvest_season":null,"leaf":true,"leaf_color":["green","red","pink"],"edible_leaf":false,"cuisine":false,"medicinal":false,"poisonous_to_humans":0,"poisonous_to_pets":0,"description":"The Kandy Kitchen Japanese Maple is an amazing plant species to add to any garden or landscape. With its red and white variegated leaves and orange-red fall color, it adds an impressive splash of color. It's an upright, rounded form and fast growth rate make it a dynamic feature, and it grows well in both full sun and partial shade, making it an extremely versatile species. This Japanese Maple does well in USDA Hardiness Zones 5-9, making it a \"must-have\" for any temperate garden. It is disease and pest resistant, and is relatively drought tolerant as well. With beautiful foliage and petite size, the Kandy Kitchen Japanese Maple is a great addition to any yard!","default_image":{"license":4,"license_name":"Attribution License","license_url":"https:\/\/creativecommons.org\/licenses\/by\/2.0\/","original_url":"https:\/\/perenual.com\/storage\/species_image\/69_acer_palmatum_kandy_kitchen\/og\/51150061025_29f690d490_b.jpg","regular_url":"https:\/\/perenual.com\/storage\/species_image\/69_acer_palmatum_kandy_kitchen\/regular\/51150061025_29f690d490_b.jpg","medium_url":"https:\/\/perenual.com\/storage\/species_image\/69_acer_palmatum_kandy_kitchen\/medium\/51150061025_29f690d490_b.jpg","small_url":"https:\/\/perenual.com\/storage\/species_image\/69_acer_palmatum_kandy_kitchen\/small\/51150061025_29f690d490_b.jpg","thumbnail":"https:\/\/perenual.com\/storage\/species_image\/69_acer_palmatum_kandy_kitchen\/thumbnail\/51150061025_29f690d490_b.jpg"},"other_images":"Upgrade Plan To Supreme For Access https:\/\/perenual.com\/subscription-api-pricing. Im sorry"}
    const careResponse = {"data":[{"id":1605,"species_id":69,"common_name":"Kandy Kitchen Japanese Maple","scientific_name":["Acer palmatum 'Kandy Kitchen'"],"section":[{"id":5020,"type":"watering","description":"Kandy Kitchen Japanese Maple (Acer palmatum 'Kandy Kitchen') should be watered deeply and infrequently, approximately every 7 days during the growing season. During the hot summer months, watering should be increased to ensure the root system does not dry out. In mid-summer (July and August), 2 to 3 waterings per week are recommended. When watering, use enough water to saturate the root system and allow the soil to dry out between waterings."},{"id":5021,"type":"sunlight","description":"Kandy Kitchen Japanese Maple (Acer palmatum 'Kandy Kitchen') prefers to be grown in bright, filtered sunlight or partial shade. For optimal health, up to 4 hours of direct sunlight per day is best. Keep in mind that the amount of direct sun is dependent on your region and climate, and the plant must be protected from scorching midday rays. To ensure that your Kandy Kitchen Japanese Maple plant gets the right amount of sunlight, they should be placed in a location that receives morning sun and some additional dappled sun during the late afternoon. Direct sun in the afternoon should be avoided so the foliage does not become scorched."},{"id":5022,"type":"pruning","description":"Kandy Kitchen Japanese Maple should be pruned in early spring, ideally right after the last frost, or in late summer after the harshest of summer's heat has passed. Cut back branches that have grown too long and prune away dead or unhealthy branches as needed. Pruning can help to promote a fuller, more natural looking foliage shape for this type of tree. Be careful not to over prune as this can cause the tree to be unhealthy and slow down its growth. It is best to remove no more than 1-third of the tree at any 1 time. This will encourage a healthy growth and keep the Japanese Maple looking its best."}]}],"to":1,"per_page":30,"current_page":1,"from":1,"last_page":1,"total":1}

    if (!careResponse.data ||
        careResponse.data.length === 0 ||
        !careResponse.data[0].common_name ||
        !careResponse.data[0].scientific_name ||
        !detailsResponse ||
        !detailsResponse.default_image ||
        !detailsResponse.default_image.original_url ||
        !detailsResponse.description) {
        res.send({});
    } else {
        const watering = careResponse.data[0].section.find(obj => {
            return obj.type === 'watering' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        const sunlight = careResponse.data[0].section.find(obj => {
            return obj.type === 'sunlight' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        const pruning = careResponse.data[0].section.find(obj => {
            return obj.type === 'pruning' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        const mock = {
            common_name: careResponse.data[0].common_name,
            scientific_name: Array.isArray(careResponse.data[0].scientific_name) ?
                careResponse.data[0].scientific_name[0] :
                careResponse.data[0].scientific_name,
            image: detailsResponse.default_image.original_url,
            description: detailsResponse.description,
            watering: watering?.description,
            sunlight: sunlight?.description,
            pruning: pruning?.description,
        };
        res.send(mock);
    }


});
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
