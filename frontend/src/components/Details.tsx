import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { LanguageContext } from '../App';
import './Details.scss';

export default function Details() {
    const [data, setData] = useState<null | {
        common_name: string,
        scientific_name: string,
        image: string,
        description: string,
        watering: string | undefined,
        sunlight: string | undefined,
        pruning: string | undefined,
    }>(null);
    const { id } = useParams();
    const language = useContext(LanguageContext);
    useEffect(() => {
        setData(null);
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/api/details/${encodeURIComponent(language.lang)}/${id}`)
            .then(res => {
                return res.json();
            })
            .then(res => {
                setData(res);
            }).catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    if (data === null)
        return (
            <div>
                <img draggable={false}
                     style={{ userSelect: "none" }}
                     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading"
                />
            </div>
        );
    if (JSON.stringify(data) === '{}')
        return <div>Unknown plant ID!</div>;

    let watering, sunlight, pruning;
    switch (language.lang) {
        case 'bg':
            watering = 'Поливане';
            sunlight = 'Слънчева светлина';
            pruning = 'Подрязване';
            break;
        case 'cs':
            watering = 'Zalévání';
            sunlight = 'Sluneční světlo';
            pruning = 'Řezání';
            break;
        case 'da':
            watering = 'Vanding';
            sunlight = 'Sollys';
            pruning = 'Beskæring';
            break;
        case 'de':
            watering = 'Bewässerung';
            sunlight = 'Sonnenlicht';
            pruning = 'Schneiden';
            break;
        case 'el':
            watering = 'Ποτίσμα';
            sunlight = 'Ηλιακό φως';
            pruning = 'Κλάδεμα';
            break;
        case 'en-gb':
        case 'en-us':
            watering = 'Watering';
            sunlight = 'Sunlight';
            pruning = 'Pruning';
            break;
        case 'es':
            watering = 'Riego';
            sunlight = 'Luz solar';
            pruning = 'Poda';
            break;
        case 'et':
            watering = 'Kastmine';
            sunlight = 'Päikesevalgus';
            pruning = 'Pügamine';
            break;
        case 'fi':
            watering = 'Kastelu';
            sunlight = 'Auringonvalo';
            pruning = 'Leikkaaminen';
            break;
        case 'fr':
            watering = 'Arrosage';
            sunlight = 'Lumière du soleil';
            pruning = 'Taille';
            break;
        case 'hu':
            watering = 'Öntözés';
            sunlight = 'Napfény';
            pruning = 'Metszés';
            break;
        case 'id':
            watering = 'Penyiraman';
            sunlight = 'Cahaya matahari';
            pruning = 'Pemangkasan';
            break;
        case 'it':
            watering = 'Irrigazione';
            sunlight = 'Luce solare';
            pruning = 'Potatura';
            break;
        case 'ja':
            watering = '水やり';
            sunlight = '日光';
            pruning = '剪定';
            break;
        case 'ko':
            watering = '물 주기';
            sunlight = '태양광';
            pruning = '가지치기';
            break;
        case 'lt':
            watering = 'Laistymas';
            sunlight = 'Saulės šviesa';
            pruning = 'Pjovimas';
            break;
        case 'lv':
            watering = 'Apūdeņošana';
            sunlight = 'Saules gaismā';
            pruning = 'Cērpešana';
            break;
        case 'nb':
            watering = 'Vanning';
            sunlight = 'Sollys';
            pruning = 'Beskjæring';
            break;
        case 'nl':
            watering = 'Water geven';
            sunlight = 'Zonlicht';
            pruning = 'Snoeien';
            break;
        case 'pl':
            watering = 'Podlewanie';
            sunlight = 'Światło słoneczne';
            pruning = 'Przycinanie';
            break;
        case 'pt-br':
        case 'pt-pt':
            watering = 'Rega';
            sunlight = 'Luz solar';
            pruning = 'Poda';
            break;
        case 'ro':
            watering = 'Udare';
            sunlight = 'Lumină solară';
            pruning = 'Tăiere';
            break;
        case 'ru':
            watering = 'Полив';
            sunlight = 'Солнечный свет';
            pruning = 'Обрезка';
            break;
        case 'sk':
            watering = 'Zalievanie';
            sunlight = 'Svetlo slnka';
            pruning = 'Orezávanie';
            break;
        case 'sl':
            watering = 'Zalivanje';
            sunlight = 'Sončna svetloba';
            pruning = 'Obrezovanje';
            break;
        case 'sv':
            watering = 'Bevattning';
            sunlight = 'Solljus';
            pruning = 'Beskärning';
            break;
        case 'tr':
            watering = 'Sulama';
            sunlight = 'Güneş ışığı';
            pruning = 'Budama';
            break;
        case 'uk':
            watering = 'Полив';
            sunlight = 'Сонячне світло';
            pruning = 'Обрізка';
            break;
        case 'zh':
            watering = '浇水';
            sunlight = '阳光';
            pruning = '修剪';
            break;
        default:
            watering = 'Watering';
            sunlight = 'Sunlight';
            pruning = 'Pruning';
            break;
    }


    const wateringHTML = typeof data.watering === 'undefined' ? <></> : (
        <>
            <h3>{watering}</h3>
            <p>{data.watering}</p>
        </>
    );
    const sunlightHTML = typeof data.sunlight === 'undefined' ? <></> : (
        <>
            <h3>{sunlight}</h3>
            <p>{data.sunlight}</p>
        </>
    );
    const pruningHTML = typeof data.pruning === 'undefined' ? <></> : (
        <>
            <h3>{pruning}</h3>
            <p>{data.pruning}</p>
        </>
    );


    return (
        <div id="detailsWrapper">
            <h1>{data.common_name}</h1>
            <h2>{data.scientific_name}</h2>
            <div id="imageWrapper">
                <img src={data.image} alt="Venus Fly Trap"/>
            </div>
            <p>{data.description}</p>
            {wateringHTML}
            {sunlightHTML}
            {pruningHTML}
        </div>
    )
}