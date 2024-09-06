import axios from 'axios';

const LIBRETRANSLATE_URL = 'https://libretranslate.com/translate';

export const translateText = async (text, targetLang) => {
    const response = await axios.post(LIBRETRANSLATE_URL, {
        q: text,
        source: 'en',
        target: "hi",
        format: 'text'
    });
    return response.data.translatedText;
};