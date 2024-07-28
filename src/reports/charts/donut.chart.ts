import * as Utils from "src/helpers/chart-utils";

interface DonutEntry {
    label: string;
    value: number;
}

interface DonutOptions {
    positions?: 'left' | 'right' | 'top' | 'bottom';
    entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
    const { positions = 'top' } = options;
    const data = {
        labels: options.entries.map((e) => e.label),
        datasets: [
            {
                label: 'Dataset 1',
                data: options.entries.map((e) => e.value),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                position: positions
            },
            plugins: {
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 16,
                    }
                }
            }

        },
    };

    return Utils.chartJsToImage(config)
}