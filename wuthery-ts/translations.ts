import { TRANSLATIONS_PATH } from './constants';

/**
 * Fetches the translation for the given language.
 * @param lang Language to fetch translation for.
 * @returns Translation for the given language.
 */
export const fetchTranslation = async (lang: string): Promise<any> => {
    const rsp = await fetch(`${TRANSLATIONS_PATH}/${lang}.json`);
    return await rsp.json();
};
