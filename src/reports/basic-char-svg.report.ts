import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import * as Utils from '../helpers/chart-utils'

let svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const genereteChartImage = async () => {
    const chartConfig = {
        type: 'bar',
        data: {
            labels: [2012, 2013, 2014, 2015, 2016],
            datasets: [{
                label: 'Users',
                data: [120, 60, 50, 180, 120]
            }]
        }
    }

    return Utils.chartJsToImage(chartConfig);
}

const genereteDonut = () => {

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
        },
    };

    return Utils.chartJsToImage(config);
}

export const getBasicChartSvgReport =
    async (): Promise<TDocumentDefinitions> => {

        const [chart, chartDonut] = await Promise.all([genereteChartImage(), genereteDonut()]);

        return {
            content: [
                { svg: svgContent, width: 200, fit: [100, 100] },
                { image: chart, width: 500 },
                { image: chartDonut, width: 500 }
            ]
        }

    }