import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getEmploymentLetterReportById, getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printerService: PrinterService
    ) { super() }

    Hello() {
        const docDefinition = getHelloWorldReport({ name: 'Jacob Medina' });
        const doc = this.printerService.creatPdf(docDefinition);
        return doc;
    }

    employmentLetter() {
        const docDefinition = getEmploymentLetterReport();
        const doc = this.printerService.creatPdf(docDefinition);
        return doc;
    }

    async employmentLetterByID(employeeId: number) {
        const employee = await this.employees.findUnique({
            where: {
                id: employeeId,
            }
        })

        if (!employee) {
            throw new NotFoundException(`Employee not found with id: ${employeeId}`);
        }

        const docDefinition = getEmploymentLetterReportById({
            employerName: 'Jacob Medina',
            employerPosition: 'Software Developer',
            employeeName: employee.name,
            employeePosition: employee.position,
            employeeStartDate: employee.start_date,
            employeeHours: employee.hours_per_day,
            employeeWorkSchedule: employee.work_schedule,
            employerCompany: 'Medina Software Inc.',
        });
        const doc = this.printerService.creatPdf(docDefinition);
        return doc;
    }
}
