import YAML from 'yaml';

const FILE_LOCATION = "https://raw.githubusercontent.com/Wuthery/l10n/main/l10n/";

export const fetchTranslations = async (lang: string): Promise<any> => {
    const url = FILE_LOCATION + lang + ".yml"; 
    const response = await fetch(url);
    const asText = await response.text();
    return YAML.parse(asText);
};