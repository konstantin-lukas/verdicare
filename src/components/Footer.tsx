import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import './Footer.scss';

export default function Footer() {
    const currentLang = useContext(LanguageContext);

    let privacy: string;
    let legal: string;

    switch (currentLang.lang) {
        case 'bg':
            privacy = 'Политика за поверителност';
            legal = 'Правно известие';
            break;
        case 'cs':
            privacy = 'Zásady ochrany osobních údajů';
            legal = 'Právní upozornění';
            break;
        case 'da':
            privacy = 'Privatlivspolitik';
            legal = 'Juridisk meddelelse';
            break;
        case 'de':
            privacy = 'Datenschutz';
            legal = 'Impressum';
            break;
        case 'el':
            privacy = 'Πολιτική απορρήτου';
            legal = 'Νομική ειδοποίηση';
            break;
        case 'es':
            privacy = 'Protección de datos';
            legal = 'Aviso legal';
            break;
        case 'et':
            privacy = 'Privaatsuspoliitika';
            legal = 'Juriidiline teatis';
            break;
        case 'fi':
            privacy = 'Tietosuojakäytäntö';
            legal = 'Oikeudellinen huomautus';
            break;
        case 'fr':
            privacy = 'Politique de confidentialité';
            legal = 'Avis juridique';
            break;
        case 'hu':
            privacy = 'Adatvédelmi irányelvek';
            legal = 'Jogi közlemény';
            break;
        case 'id':
            privacy = 'Kebijakan Privasi';
            legal = 'Pemberitahuan Hukum';
            break;
        case 'it':
            privacy = 'Informativa sulla privacy';
            legal = 'Avviso legale';
            break;
        case 'ja':
            privacy = '個人情報保護について';
            legal = '法的告知';
            break;
        case 'ko':
            privacy = '개인정보 보호정책';
            legal = '법적 고지';
            break;
        case 'lt':
            privacy = 'Privatumo politika';
            legal = 'Teisinis pranešimas';
            break;
        case 'lv':
            privacy = 'Konfidencialitātes politika';
            legal = 'Juridiskais paziņojums';
            break;
        case 'nb':
            privacy = 'Retningslinjer for personvern';
            legal = 'Juridisk merknad';
            break;
        case 'nl':
            privacy = 'Privacybeleid';
            legal = 'Wettelijke kennisgeving';
            break;
        case 'pl':
            privacy = 'Polityka prywatności';
            legal = 'Nota prawna';
            break;
        case 'pt-br':
        case 'pt-pt':
            privacy = 'Política de privacidade';
            legal = 'Aviso legal';
            break;
        case 'ro':
            privacy = 'Politica de confidențialitate';
            legal = 'Aviz juridic';
            break;
        case 'ru':
            privacy = 'Политика конфиденциальности';
            legal = 'Юридическое уведомление';
            break;
        case 'sk':
            privacy = 'Zásady ochrany osobných údajov';
            legal = 'Právne upozornenie';
            break;
        case 'sl':
            privacy = 'Pravilnik o zasebnosti';
            legal = 'Pravno obvestilo';
            break;
        case 'sv':
            privacy = 'Integritetspolicy';
            legal = 'Rättsligt meddelande';
            break;
        case 'tr':
            privacy = 'Gizlilik Politikası';
            legal = 'Yasal Uyarı';
            break;
        case 'uk':
            privacy = 'Політика конфіденційності';
            legal = 'Юридичне повідомлення';
            break;
        case 'zh':
            privacy = '隐私政策';
            legal = '法律声明';
            break;
        case 'en-gb':
        case 'en-us':
        default:
            privacy = 'Privacy Policy';
            legal = 'Legal Notice';
            break;
    }

    return (
        <footer>
            <div id="footerContent">
                <a id="datenschutz" href="https://konstantinlukas.de/datenschutz">{privacy}</a>
                <a id="impressum" href="https://konstantinlukas.de/impressum">{legal}</a>
            </div>
        </footer>
    );
}