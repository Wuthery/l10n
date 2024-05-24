import React, { useContext, useState, createContext, useEffect } from 'react';
import { Language } from './enum';
import { fetchTranslations } from './translations';

const LANGUAGE_KEY = 'wutheryLang';

const mapToSupportedLanguage = (lang: string): Language => {
    switch (lang) {
        case 'en':
            return Language.EN_US;
        case 'zh-TW':
            return Language.ZH_TW;
        case 'zh-CN':
            return Language.ZH_CN;
        case 'uk':
            return Language.UA;
        case 'de':
            return Language.DE;
        case 'es':
            return Language.ES;
        case 'ja':
            return Language.JA;
        case 'ko':
            return Language.KO;
        default:
            return Language.EN_US; // Fallback to English (US) if not matched
    }
};

interface I18nContextProps {
    language: Language;
    translations: any;
    changeLanguage: (lang: Language) => void;
    getTranslation: (key: number, variables?: any) => string;
}

const I18nContext = createContext<I18nContextProps>({
    language: Language.EN_US,
    translations: {},
    changeLanguage: () => {},
    getTranslation: () => '',
});

type I18nProviderProps = {
    children?: React.ReactNode;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(Language.EN_US);
    const [translations, setTranslations] = useState<any>({});

    useEffect(() => {
        const storedLang = localStorage.getItem(LANGUAGE_KEY) as Language | null;
        const userLang = storedLang || mapToSupportedLanguage(navigator.language);
        setLanguage(userLang);
        localStorage.setItem(LANGUAGE_KEY, userLang);
    
        fetchTranslations(userLang).then(setTranslations);
    }, []);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem(LANGUAGE_KEY, lang);
        fetchTranslations(lang).then(setTranslations);
    };

    const getTranslation = (key: number, variables?: any) => {
        let translation: string = translations[key] || String(key);
        if (variables) {
            Object.keys(variables).forEach((variable) => {
                translation = translation.replace(`{${variable}}`, variables[variable]);
            });
        }
        return translation;
    }

    return (
        <I18nContext.Provider value={{ language, translations, changeLanguage, getTranslation }}>
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
