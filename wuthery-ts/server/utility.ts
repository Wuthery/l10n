import { headers, cookies } from 'next/headers';

import { LANGUAGE_KEY } from '../constants';
import { Language } from '../enums';


/**
 * Map lang to supported language.
 * @param lang Lang to map. 
 * @returns Supported language.
 */
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

/**
 * Detect request language using cookies or accept-language header.
 * @returns Detected language.
 */
export const detectReqLanguage = (): Language => {
    const language = cookies().get(LANGUAGE_KEY)?.value as Language || undefined;
    if (language) {
        return language;
    }

    const acceptLanguage = headers().get('accept-language') || '';
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());

    return languages.map(mapToSupportedLanguage).find(
        lang => lang !== Language.EN_US
    ) || Language.EN_US;
};
