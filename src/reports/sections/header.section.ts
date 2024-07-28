import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'left',
    margin: [0, 0, 0, 20],
}

const currentDate: Content = {
    text: DateFormatter.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [20, 40],
    width: 150,
    fontSize: 10,
}

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subtitle, showLogo = true, showDate = true } = options;
    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;
    const headerSubtitle: Content = subtitle ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 0, 0, 20],
        style: {
            fontSize: 16,
        },
    } : null;
    const headerTitle: Content = title ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0, 20, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22,

                },
            },
            headerSubtitle
        ],
    } : null;

    return {
        columns: [headerLogo, headerTitle, headerDate],
    }
}