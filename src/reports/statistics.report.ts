import { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";
import { getLineChart } from "./charts/line.chart";
import { getBarsChart } from "./charts/bars.chart";
import { footerSection } from "./sections/footer.section";
import { getRadarChart } from "./charts/radar.chart";


interface TopCountry {
    country: string;
    customers: number;
}

interface ReportOptions {
    title?: string;
    subtitle?: string;
    topCountries: TopCountry[];
}

export const getStatisticsReport = async (
    options: ReportOptions,
): Promise<TDocumentDefinitions> => {

    const [donutChart, lineChart, barChart1, radarChart] = await Promise.all([
        getDonutChart({
            entries: options.topCountries.map((e) => ({
                label: e.country,
                value: e.customers,
            })),
            positions: 'left',
        }),
        getLineChart(),
        getBarsChart(),
        getRadarChart(),
    ]);

    const docDefinition: TDocumentDefinitions = {
        pageMargins: [40, 100, 40, 60],
        header: headerSection({
            title: options.title || 'Estadisticas de clientes',
            subtitle: options.subtitle || 'Top 10 paises con más clientes',
        }),
        footer: footerSection,
        content: [
            {
                columns: [
                    {
                        stack: [
                            {
                                text: '10 países con más clientes',
                                alignment: 'center',
                                margin: [0, 0, 0, 10],
                            },
                            {
                                image: donutChart,
                                width: 320,
                            }
                        ],
                    },
                    {
                        layout: 'lightHorizontalLines',
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            widths: [100, 'auto'],
                            body: [
                                ['País', 'Clientes'],
                                ...options.topCountries.map((e) => [e.country, e.customers]),
                            ]
                        }
                    }
                ],
            },
            {
                image: lineChart,
                width: 500,
                margin: [0, 40],
            },
            {
                columnGap: 10,
                columns: [
                    {
                        image: barChart1,
                        width: 250,
                    },
                    {
                        image: radarChart,
                        width: 250,
                    }
                ],
            }
        ],
    };

    return docDefinition;
};