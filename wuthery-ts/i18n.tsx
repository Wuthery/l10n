import React, { useContext, useState, createContext } from 'react';
import { setCookie } from 'cookies-next';

import { fetchTranslation } from './translations';
import { LANGUAGE_KEY } from './constants';
import { Language } from './enum';


interface I18nContextProps {
    language: Language;
    translations: any;
    changeLanguage: (lang: Language) => void;
    t: (key: string, variables?: any) => string;
};

const I18nContext = createContext<I18nContextProps>({
    language: Language.EN_US,
    translations: {},
    changeLanguage: () => {},
    t: () => '',
});

type I18nProviderProps = {
    children?: React.ReactNode;
    initialLanguage: Language;
    initialTranslations: any;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, initialLanguage, initialTranslations }) => {
    const [language, setLanguage] = useState<Language>(initialLanguage);
    const [translations, setTranslations] = useState<any>(initialTranslations);

    const changeLanguage = async (lang: Language) => {
        setLanguage(lang); setCookie(LANGUAGE_KEY, lang);
        if (!translations[lang]) {
            const translation = await fetchTranslation(lang);
            setTranslations((prevTranslations: any) => ({ ...prevTranslations, [lang]: translation }));
        }
    };

    const t = (key: string, variables?: any) => {
        let translation: string = translations[language]?.[key] || key;
        if (variables) {
            Object.keys(variables).forEach((variable) => {
                translation = translation.replace(`{${variable}}`, variables[variable]);
            });
        }
        return translation;
    };

    return (
        <I18nContext.Provider value={{ language, translations, changeLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
