import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) { }

  @Get('html-reports')
  async getHtmlReports(
    @Res() response: Response,
  ) {
    const pdfDoc = this.extraReportsService.getHtmlReports();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Html report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('community-report')
  async getCommunityReport(
    @Res() response: Response,
  ) {
    const pdfDoc = this.extraReportsService.getCommunity();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Community';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  async getCustomSizeReport(
    @Res() response: Response,
  ) {
    const pdfDoc = this.extraReportsService.getCustomSize();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom-size';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
