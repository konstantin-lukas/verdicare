import express, { Request, Response } from "express";
import * as deepl from 'deepl-node';
import 'dotenv/config';
import {TargetLanguageCode} from "deepl-node";
const router = express.Router();

router.get('/details/:lang/:id', async (req: Request, res: Response) => {
    res.type('json');

    let detailsURI = `https://perenual.com/api/species/details/${req.params.id}?key=${process.env.PERENUAL_API_KEY}`;
    let careGuideURI = `https://perenual.com/api/species-care-guide-list?key=${process.env.PERENUAL_API_KEY}&species_id=${req.params.id}`;


    const detailsResponse = await fetch(detailsURI).then(res => res.json()).catch(() => null);
    const careResponse = await fetch(careGuideURI).then(res => res.json()).catch(() => null);


    //const detailsResponse = {"id":5,"common_name":"Fraser Fir","scientific_name":["Abies fraseri"],"other_name":["Southern Fir"],"family":"Pinaceae","origin":["Southeastern United States"],"type":"tree","dimension":"Height:  35 feet","dimensions":{"type":"Height","min_value":35,"max_value":35,"unit":"feet"},"cycle":"Perennial","attracts":[],"propagation":["Seed Propagation","Seed Propagation","Seed Propagation","Cutting","Grafting Propagation","Layering Propagation","Tissue Culture"],"hardiness":{"min":"6","max":"6"},"hardiness_location":{"full_url":"https:\/\/perenual.com\/api\/hardiness-map?species_id=5&size=og&key=sk-xIVb64fd7712c15411934","full_iframe":"<iframe frameborder=0 scrolling=yes seamless=seamless width=1000 height=550 style='margin:auto;' src='https:\/\/perenual.com\/api\/hardiness-map?species_id=5&size=og&key=sk-xIVb64fd7712c15411934'><\/iframe>"},"watering":"Frequent","depth_water_requirement":[],"volume_water_requirement":[],"watering_period":null,"watering_general_benchmark":{"value":null,"unit":"days"},"plant_anatomy":[{"part":"leaves","color":["dark-green"]},{"part":"cones","color":["light-green"]},{"part":"branches","color":["silver"]}],"sunlight":["full sun","part shade","filtered shade"],"pruning_month":["February","March","April","June","July","August"],"pruning_count":[],"seeds":0,"maintenance":"Moderate","care-guides":"http:\/\/perenual.com\/api\/species-care-guide-list?species_id=5&key=sk-xIVb64fd7712c15411934","soil":["Well-drained"],"growth_rate":"Moderate","drought_tolerant":false,"salt_tolerant":false,"thorny":false,"invasive":false,"tropical":false,"indoor":false,"care_level":"Medium","pest_susceptibility":["Aphids","adelgids","  Pest resistant"," Disease resistant "],"pest_susceptibility_api":"Coming Soon","flowers":true,"flowering_season":null,"flower_color":"No flowers, Brown","cones":true,"fruits":false,"edible_fruit":false,"edible_fruit_taste_profile":"Coming Soon","fruit_nutritional_value":"Coming Soon","fruit_color":[],"harvest_season":null,"leaf":true,"leaf_color":["green"],"edible_leaf":false,"cuisine":false,"medicinal":false,"poisonous_to_humans":0,"poisonous_to_pets":0,"description":"The Fraser Fir (Abies fraseri) is an amazing tree species with many great qualities. It is a dense evergreen conifer native to the Appalachian mountains. Its pyramidal shape and glossy dark green needles, that curve upward, make it a beautiful and popular Christmas tree. Its needles are short, soft, flat and pleasant to the touch. It has been found to be highly resistant to pests, diseases, and environmental stress. Additionally, it has superior winter hardiness and a strong wood that produces very little sap. This incredible species is perfect for a variety of evergreen applications and is guaranteed to bring a unique and beautiful look to any landscape.","default_image":{"license":4,"license_name":"Attribution License","license_url":"https:\/\/creativecommons.org\/licenses\/by\/2.0\/","original_url":"https:\/\/perenual.com\/storage\/species_image\/5_abies_fraseri\/og\/36843539702_e80fc436e0_b.jpg","regular_url":"https:\/\/perenual.com\/storage\/species_image\/5_abies_fraseri\/regular\/36843539702_e80fc436e0_b.jpg","medium_url":"https:\/\/perenual.com\/storage\/species_image\/5_abies_fraseri\/medium\/36843539702_e80fc436e0_b.jpg","small_url":"https:\/\/perenual.com\/storage\/species_image\/5_abies_fraseri\/small\/36843539702_e80fc436e0_b.jpg","thumbnail":"https:\/\/perenual.com\/storage\/species_image\/5_abies_fraseri\/thumbnail\/36843539702_e80fc436e0_b.jpg"},"other_images":"Upgrade Plan To Supreme For Access https:\/\/perenual.com\/subscription-api-pricing. Im sorry"}
    //const careResponse = {"data":[{"id":47,"species_id":5,"common_name":"Fraser Fir","scientific_name":["Abies fraseri"],"section":[{"id":1199,"type":"watering","description":"Fraser Fir (Abies fraseri) should be watered once every 2 weeks in the spring and summer. In the fall and winter, Fraser Fir should be watered only when the top few inches of soil become dry (around once a month). Water thoroughly until water runs out of the drainage holes. It is important to check the plant's soil moisture levels before watering to ensure that the soil doesn't become too wet."},{"id":1200,"type":"sunlight","description":"Fraser Fir (Abies fraseri) plants require full sun to thrive and will benefit from at least 6 hours of direct sunlight each day. This species usually does better in cooler climates, where it will receive partial or filtered light for the remainder of the day. It is important to remember that during the summer months, when the days are longer, Fraser Fir can still become stressed from too much exposure to sunlight, especially when temperatures are very high. To avoid sunscald or other damage, make sure to give your Fraser Fir some shade in the afternoon or on particularly hot days."},{"id":1201,"type":"pruning","description":"Pruning should generally be done in late winter or early spring, when the Fraser Fir tree is dormant. Otherwise, it is best to prune in the summer. Pruning should be done lightly, taking no more than 10-15% of the tree's foliage away. This will allow the tree time to heal and put its energy into new growth and development. If you have to prune more than that, divide it up over several years."}]}],"to":1,"per_page":30,"current_page":1,"from":1,"last_page":1,"total":1}

    if (!(careResponse?.data?.length > 0) ||
        !careResponse?.data?.[0]?.common_name ||
        !careResponse?.data?.[0]?.scientific_name ||
        !detailsResponse?.default_image?.regular_url ||
        !detailsResponse?.description) {
        res.send({});
    } else {
        const watering = careResponse.data[0].section.find((obj: any) => {
            return obj.type === 'watering' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        const sunlight = careResponse.data[0].section.find((obj: any) => {
            return obj.type === 'sunlight' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        const pruning = careResponse.data[0].section.find((obj: any) => {
            return obj.type === 'pruning' && typeof obj.description !== 'undefined' && obj.description !== null
        });
        if (!req.params.lang || req.params.lang === 'en' || req.params.lang === 'en-gb' || req.params.lang === 'en-us') {
            res.send({
                common_name: careResponse.data[0].common_name,
                scientific_name: Array.isArray(careResponse.data[0].scientific_name) ?
                    careResponse.data[0].scientific_name[0] :
                    careResponse.data[0].scientific_name,
                image: detailsResponse.default_image.regular_url,
                description: detailsResponse.description,
                watering: watering?.description,
                sunlight: sunlight?.description,
                pruning: pruning?.description,
            });
        } else {
            const lang = decodeURIComponent(req.params.lang);
            const translator = new deepl.Translator(process.env.DEEPL_API_KEY as string);
            const common_name = await translator.translateText(careResponse.data[0].common_name as string, 'en', lang as TargetLanguageCode)
                .then((result) => result.text)
                .catch(() => careResponse.data[0].common_name);
            const scientific_name = await translator.translateText((Array.isArray(careResponse.data[0].scientific_name) ?
                careResponse.data[0].scientific_name[0] :
                careResponse.data[0].scientific_name) as string, 'en', lang as TargetLanguageCode)
                .then((result) => result.text)
                .catch(() => Array.isArray(careResponse.data[0].scientific_name) ?
                    careResponse.data[0].scientific_name[0] :
                    careResponse.data[0].scientific_name);
            const description = await translator.translateText(detailsResponse.description as string, 'en', lang as TargetLanguageCode)
                .then((result) => result.text)
                .catch(() => detailsResponse.description);

            let translatedWatering: string = watering?.description;
            let translatedSunlight = sunlight?.description;
            let translatedPruning = pruning?.description;
            if (translatedWatering) {
                translatedWatering = await translator.translateText(watering.description as string, 'en', lang as TargetLanguageCode)
                    .then((result) => result.text)
                    .catch(() => watering.description);
            }
            if (translatedSunlight) {
                translatedSunlight = await translator.translateText(sunlight.description as string, 'en', lang as TargetLanguageCode)
                    .then((result) => result.text)
                    .catch(() => sunlight.description);
            }
            if (translatedPruning) {
                translatedPruning = await translator.translateText(pruning.description as string, 'en', lang as TargetLanguageCode)
                    .then((result) => result.text)
                    .catch(() => pruning.description);
            }
            res.send({
                common_name,
                scientific_name,
                image: detailsResponse.default_image.regular_url,
                description,
                watering: translatedWatering,
                sunlight: translatedSunlight,
                pruning: translatedPruning
            });

        }

    }


});
router.get('/search/:lang/:page/:query?', async (req: Request, res: Response) => {
    res.type('json');
    const lang = decodeURIComponent(req.params.lang);
    const page = decodeURIComponent(req.params.page);
    let searchString = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`;
    searchString +=`&page=${page}`;
    if (req.params.query)
        searchString +=`&q=${req.params.query}`;

    const response = await fetch(searchString).then(res => res.json()).catch(() => null);
    if (!response?.data?.length) {
        res.send([]);
        return;
    }
    const filteredData = response.data.filter((obj: any) => {
        return !(
            !obj?.id ||
            !obj?.common_name ||
            !obj.scientific_name ||
            !obj?.default_image?.medium_url ||
            !obj?.default_image?.regular_url ||
            /upgrade.access/.test(obj.default_image.medium_url)
        );
    });

    let transformedData = filteredData.map((obj: any) => {
        const id = obj.id;
        const common_name = Array.isArray(obj.common_name) ? obj.common_name[0] : obj.common_name;
        const scientific_name = Array.isArray(obj.scientific_name) ? obj.scientific_name[0] : obj.scientific_name;
        const image = obj.default_image.medium_url;
        return {
            id,
            common_name,
            scientific_name,
            image
        }
    });

    if (process.env.DEEPL_API_KEY && lang !== 'en' && lang !== 'en-gb' && lang !== 'en-us') {
        const translator = new deepl.Translator(process.env.DEEPL_API_KEY);
        transformedData = await Promise.all(transformedData.map(async (obj: any) => {
            const common = await translator.translateText(obj.common_name as string, 'en', lang as TargetLanguageCode)
                .then((result) => result.text)
                .catch(() => obj.common_name);
            const scientific = await translator.translateText(obj.scientific_name as string, 'en', lang as TargetLanguageCode)
                .then((result) => result.text)
                .catch(() => obj.scientific_name);
            return {
                id: obj.id,
                common_name: common,
                scientific_name: scientific,
                image: obj.image
            };
        }));
    }

    res.send(transformedData);
})
export default router;
