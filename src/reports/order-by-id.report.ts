import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormater, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30]
}

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 30, 0, 0],
    },

    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 0],
    }
}

export interface CompleteOrder {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
}

export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
}


interface ReportValues {
    title?: string;
    subTitle?: string;
    data: CompleteOrder
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {

    const { data } = value;

    const { customers, order_details } = data;

    const subTotal = order_details.reduce((acc, detail) =>
        acc + (detail.quantity * +detail.products.price), 0
    )

    const total = subTotal * 1.16;

    return {
        styles: styles,
        header: logo,
        pageMargins: [40, 60, 40, 60],
        footer: footerSection,
        content: [
            // Header
            {
                text: 'Tucan Code',
                style: 'header'
            },
            // Address y numero de recibo
            {
                columns: [
                    {
                        text: `15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, \nCANADA BN: 12783671823 \nhttps://devtalles.com`,
                    },
                    {
                        text: [
                            {
                                text: `Recibo No#: ${data.order_id} \n`,
                                bold: true
                            },
                            `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\n Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n `
                        ],
                        alignment: 'right',
                    },
                ],
            },

            //QR Code
            {
                qr: 'https://devtalles.com',
                fit: 75,
                alignment: 'right',
            },

            // Dirección del cliente
            {
                text: [
                    {
                        text: `Cobrar a: \n`,
                        style: 'subHeader',
                    },
                    `Razón Social: ${customers.customer_name} 
                    Contacto: ${customers.address} \n`
                ]
            },

            //Tabla de detalles de la orden 
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((detail) => [
                            detail.products.product_id.toString(),
                            detail.products.product_name,
                            detail.quantity.toString(),
                            {
                                text: CurrencyFormater.formatCurrency(+detail.products.price),
                                alignment: 'right'
                            },
                            {
                                text: CurrencyFormater.formatCurrency(+detail.quantity * parseFloat(detail.products.price)),
                                alignment: 'right'
                            }
                        ]),
                    ]
                }
            },

            //Salto de linea
            '\n\n',

            //Totales
            {
                columns: [
                    {
                        width: '*',
                        text: ''
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                [
                                    'Subtotal',
                                    {
                                        text: CurrencyFormater.formatCurrency(subTotal),
                                        alignment: 'right'
                                    }
                                ],
                                [
                                    { text: 'Total', bold: true },
                                    {
                                        text: CurrencyFormater.formatCurrency(total),
                                        alignment: 'right',
                                        bold: true
                                    }
                                ],
                            ]
                        }
                    }
                ]
            },
        ],
    }
}