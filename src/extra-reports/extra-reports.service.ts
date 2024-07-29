import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { footerSection } from 'src/reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {

    constructor(private PrinterService: PrinterService) { }

    getHtmlReports() {
        const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

        const content = getHtmlContent(html, {
            client: 'Jacob Medina',
            title: 'Curso de nestjs'
        });
        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 110, 40, 60],
            header: headerSection({
                title: 'HTML TO PDFMAKES',
                subtitle: 'This is a subtitle',
            }),
            footer: footerSection,
            content: content
        }
        const doc = this.PrinterService.creatPdf(docDefinition);
        return doc;
    }

    getCommunity() {

        const docDefinition = getCommunityReport();

        const doc = this.PrinterService.creatPdf(docDefinition);
        return doc;
    }

    getCustomSize() {
        const doc = this.PrinterService.creatPdf({
            // pageSize: 'TABLOID',
            pageSize: {
                width: 150,
                height: 300
            },
            content: [
                {
                    qr: 'https://google.com',
                    fit: 100,
                    alignment: 'center',
                },
                {
                    text: 'Custom size',
                    fontSize: 10,
                    alignment: 'center',
                    margin: [0, 20],
                },
            ]
        });
        return doc
    }
}
