import { Language } from './enum';


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

export const detectReqLanguage = (acceptLanguage: string): Language => {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    let userLanguage = Language.EN_US;
    for (const lang of languages) {
        userLanguage = mapToSupportedLanguage(lang);
        if (userLanguage !== Language.EN_US) break;
    }
    return userLanguage;
};