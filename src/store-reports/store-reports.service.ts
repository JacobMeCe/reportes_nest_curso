import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getBasicChartSvgReport, getStatisticsReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printerService: PrinterService
    ) { super() }

    async getOrderByIdReport(orderId: number) {
        const order = await this.orders.findUnique({
            where: {
                order_id: orderId,
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    }
                }
            }
        })

        if (!order) {
            throw new NotFoundException(`Order not found with id: ${orderId}`);
        }
        const docDefinition = orderByIdReport({
            data: order as any,
        });
        const doc = this.printerService.creatPdf(docDefinition);
        return doc;
    }

    async getSvgChart() {
        const docDefinition = await getBasicChartSvgReport();
        const doc = this.printerService.creatPdf(docDefinition);
        return doc;
    }

    async getStatistics() {
        const topContries = await this.customers.groupBy({
            by: ['country'],
            _count: true,
            orderBy: {
                _count: {
                    country: 'desc'
                }
            },
            take: 10
        });

        const topCountriesData = topContries.map(({ country, _count }) => ({
            country: country,
            customers: _count,
        }));

        const docDefinition = await getStatisticsReport(
            {
                topCountries: topCountriesData,
            }
        );
        const doc = this.printerService.creatPdf(docDefinition)
        return doc;
    }
}