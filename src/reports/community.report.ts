
import type { TDocumentDefinitions } from "pdfmake/interfaces";


export const getCommunityReport = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        defaultStyle: {
            fontSize: 10,
        },
        content: [
            //Logo information
            {
                columns: [
                    {
                        image: 'src/assets/tucan-code-logo.png',
                        width: 50,
                    },
                    {
                        alignment: 'center',
                        text: 'Forestry Community Report\n RUT: 123456789\n Camino Montaña km 14\n Teléfono: 123-456-7890\n',
                    },
                    {
                        alignment: 'right',
                        width: 140,
                        layout: 'borderBlue',
                        table: {
                            body: [
                                [
                                    {
                                        layout: 'noBorders',
                                        table: {
                                            body: [
                                                ['No. Fac.', '123-123'],
                                                ['Fecha:', '2021-10-12'],
                                                ['Versión:', '2024-001'],
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ],
            },

            // Horizontal Line
            {
                margin: [0, 10],
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 515,
                        y2: 5,
                        lineWidth: 2,
                        lineColor: '#3A4546',
                    }
                ]
            },

            // Detalles del cliente
            {
                table: {
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Datos del cliente:',
                                fillColor: '#5775E1',
                                color: 'white',
                                colSpan: 4,
                            },
                            {},
                            {},
                            {},
                        ],

                        //Razon social
                        [
                            {
                                text: 'Razon social:',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Nombre de la empresa:',
                                fillColor: 'white',
                            },
                            {
                                text: 'Direccion:',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: 'Calle falsa 123:',
                                fillColor: 'white',
                            },
                        ],

                        //RUT
                        [
                            {
                                text: 'RUT:',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: '1234567890-1',
                                fillColor: 'white',
                            },
                            {
                                text: 'Telefono:',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: '123-456-7890',
                                fillColor: 'white',
                            },
                        ],
                        [
                            {
                                text: 'Giro:',
                                fillColor: '#343a40',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Comercio al por mayor',
                                fillColor: 'white',
                            },
                            {
                                text: 'Condición de pago:',
                                fillColor: '#343a40',
                                color: 'white',
                            },
                            {
                                text: '30 días',
                                fillColor: 'white',
                            },
                        ]
                    ]
                },
            },
        ]
    }
    return docDefinition;
};