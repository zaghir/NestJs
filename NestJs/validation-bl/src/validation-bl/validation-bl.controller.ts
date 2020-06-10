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
  Query,
} from '@nestjs/common';
import { ValidationBlService } from './validation-bl.service';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user';
import { GetUser } from '../auth/get-user.decorator';

@Controller('validation-bl')
@UseGuards(AuthGuard())
export class ValidationBlController {
  constructor(private validationService: ValidationBlService) {}

  private logger = new Logger('ValidationBlController');

  @Get('/documents')
  getDocuments(    
    @GetUser() user: User ,
    @Query() query ): Promise<Document[]> {
    // this.logger.log("documents ===> User ",JSON.stringify(user));
    console.log("documents ===> User Query " ,query)
    return this.validationService.getDocuments(query.connectionName);
  }

  @Get('/documents/docLig/:docNumero')
  retrieveLigDocument(
    @Param('docNumero') docNumero: string,
    @Query() query ,
    @GetUser() user: User,
  ): Promise<LigneDocument> {
    return this.validationService.retrieveLigDocument(docNumero , query.connectionName);
  }

  @Post('/documents')
  insertDocument(
    @Query() query ,
    @Body() document: Document,
    @GetUser() user: User,
  ): Promise<Document> {
    this.logger.verbose(
      `User "${
        user.username
      }" creation d un nouveau document => Data: ${JSON.stringify(document)}`,
    );
    return this.validationService.insertDocument({ ...document } , query.connectionName);
  }

  @Post('/documents/lignedocument')
  async insertLigDocument(
    @Query() query ,
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
    return this.validationService.insertLigDocument({ ...ligneDocument } , query.connectionName);
  }

  @Patch('documents/:docNumero')
  async updateDocument(
    @Query() query ,
    @Param('docNumero', ParseIntPipe) docNumero: number,
    @GetUser() user: User,
  ): Promise<number> {
    this.logger.verbose(
      `User "${user.username}" cmase du document numero : ${docNumero}`,
    );
    return this.validationService.updateDocument(docNumero , query.connectionName);
  }
}
