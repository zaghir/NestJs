import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import { ValidationBlService } from './validation-bl.service';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('validation-bl')
@UseGuards(AuthGuard())
export class ValidationBlController {
  constructor(private validationService: ValidationBlService) {}

  private logger = new Logger('ValidationBlController');

  @Get('/documents')
  getDocuments(@GetUser() user: User): Promise<Document[]> {
    return this.validationService.getDocuments();
  }

  @Get('/documents/docLig/:docNumero')
  retrieveLigDocument(
    @Param('docNumero') docNumero: string,
    @GetUser() user: User,
  ): Promise<Document> {
    return this.validationService.retrieveLigDocument(docNumero);
  }

  @Post('/documents')
  insertDocument(
    @Body() document: Document,
    @GetUser() user: User,
  ): Promise<Document> {
    this.logger.verbose(
      `User "${
        user.username
      }" creation d un nouveau document => Data: ${JSON.stringify(document)}`,
    );
    return this.validationService.insertDocument({ ...document });
  }

  @Post('/documents/lignedocument')
  async insertLigDocument(
    @Body() ligneDocument: LigneDocument,
    @GetUser() user: User,
  ): Promise<LigneDocument> {
    this.logger.verbose(
      `User "${
        user.username
      }" creation d une ligne document => Data: ${JSON.stringify(
        ligneDocument,
      )}`,
    );
    return this.validationService.insertLigDocument({ ...ligneDocument });
  }

  @Patch('documents/:docNumero')
  async updateDocument(
    @Param('docNumero', ParseIntPipe) docNumero: number,
    @GetUser() user: User,
  ): Promise<number> {
    this.logger.verbose(
      `User "${user.username}" cmase du document numero : ${docNumero}`,
    );
    return this.validationService.updateDocument(docNumero);
  }
}
