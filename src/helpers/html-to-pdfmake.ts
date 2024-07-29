import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
    [key: string]: string;
}

export const getHtmlContent = (
    html: string,
    replacer: ContentReplacer = {}
) => {

    Object.entries(replacer).forEach(([key, value]) => {

        const key1 = `{{ ${key} }}`;
        const key2 = `{{${key}}}`;
        html = html.replaceAll(key1, value).replaceAll(key2, value)
    })

    const { window } = new JSDOM();
    return htmlToPdfmake(html, window);
}  