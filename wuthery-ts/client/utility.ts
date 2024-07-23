import { Language } from '../enums';


/**
 * Get language name.
 * @param language Language to get name for.
 * @returns Language name.
 */
export const getLanguageName = (language: Language): string => {
    return {
        'en-US': 'English',
        'zh-TW': '繁體中文',
        'zh-CN': '简体中文',
        'uk-UA': 'Українська',
        'de-DE': 'Deutsch',
        'es-ES': 'Español',
        'ja-JP': '日本語',
        'ko-KR': '한국어',
    }[language];
}
