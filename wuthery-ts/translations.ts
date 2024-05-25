const FILE_LOCATION = "https://raw.githubusercontent.com/Wuthery/l10n/main/l10n/json/";

export const fetchTranslation = async (lang: string): Promise<any> => {
    const url = FILE_LOCATION + lang + '.json'; 
    const rsp = await fetch(url);
    return await rsp.json();
};
