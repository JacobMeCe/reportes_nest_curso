import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) { }

  @Get()
  async Hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.Hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employeeId')
  async employmentLetterId(
    @Res() response: Response,
    @Param('employeeId') employeeId: string
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterByID(+employeeId);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

}
