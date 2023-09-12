import React, {ReactNode, createContext, useState, useContext, useEffect} from 'react';

export const languages: { lang: string, flag: string }[] = [
    { lang: "bg", flag: "bg" },   // Bulgarian
    { lang: "cs", flag: "cz" },   // Czech
    { lang: "da", flag: "dk" },   // Danish
    { lang: "de", flag: "de" },   // German
    { lang: "el", flag: "gr" },   // Greek
    { lang: "en-gb", flag: "gb" },   // English (British)
    { lang: "en-us", flag: "us" },   // English (American)
    { lang: "es", flag: "es" },   // Spanish
    { lang: "et", flag: "ee" },   // Estonian
    { lang: "fi", flag: "fi" },   // Finnish
    { lang: "fr", flag: "fr" },   // French
    { lang: "hu", flag: "hu" },   // Hungarian
    { lang: "id", flag: "id" },   // Indonesian
    { lang: "it", flag: "it" },   // Italian
    { lang: "ja", flag: "jp" },   // Japanese
    { lang: "ko", flag: "kr" },   // Korean
    { lang: "lt", flag: "lt" },   // Lithuanian
    { lang: "lv", flag: "lv" },   // Latvian
    { lang: "nb", flag: "no" },   // Norwegian (Bokmål)
    { lang: "nl", flag: "nl" },   // Dutch
    { lang: "pl", flag: "pl" },   // Polish
    { lang: "pt-br", flag: "br" },   // Portuguese (Brazilian)
    { lang: "pt-pt", flag: "pt" },   // Portuguese (all Portuguese varieties excluding Brazilian Portuguese)
    { lang: "ro", flag: "ro" },   // Romanian
    { lang: "ru", flag: "ru" },   // Russian
    { lang: "sk", flag: "sk" },   // Slovak
    { lang: "sl", flag: "si" },   // Slovenian
    { lang: "sv", flag: "se" },   // Swedish
    { lang: "tr", flag: "tr" },   // Turkish
    { lang: "uk", flag: "ua" },   // Ukrainian
    { lang: "zh", flag: "cn" }    // Chinese (simplified)
];

function getInitialLanguage() {
    const language = localStorage.getItem('language');
    if (language === null)
        return languages[6];
    return JSON.parse(language);
}
export let LanguageContext = createContext<{ lang: string, flag: string }>(getInitialLanguage());
export let SetLanguageContext = createContext<(language: { lang: string, flag: string }) => void>(() => {});
export let QueryContext = createContext<string>('');
export let SetQueryContext = createContext<(arg: string) => void>(() => {});
export let IsTypingContext = createContext<boolean>(false);
export let SetIsTypingContext = createContext<(arg: boolean) => void>(() => {});


export default function App({children}: {children: ReactNode[] | ReactNode}) {
    const [query, setQuery] = useState(useContext(QueryContext));
    const [typing, setTyping] = useState(useContext(IsTypingContext));
    const [currentLang, setCurrentLang] = useState(useContext(LanguageContext));
    useEffect(() => {
        localStorage.setItem('language', JSON.stringify(currentLang));
    }, [currentLang]);
    return (
        <LanguageContext.Provider value={currentLang}>
            <SetLanguageContext.Provider value={setCurrentLang}>
                <QueryContext.Provider value={query}>
                    <SetQueryContext.Provider value={setQuery}>
                        <IsTypingContext.Provider value={typing}>
                            <SetIsTypingContext.Provider value={setTyping}>
                                {children}
                           </SetIsTypingContext.Provider>
                        </IsTypingContext.Provider>
                    </SetQueryContext.Provider>
                </QueryContext.Provider>
            </SetLanguageContext.Provider>
        </LanguageContext.Provider>
    );
}

