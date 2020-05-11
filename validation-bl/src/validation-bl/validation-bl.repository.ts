import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection, InjectEntityManager } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { dbConnection } from '../config/datasource.config';
import { queries } from '../config/queries';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';

@Injectable()
export class ValidationBlRepository {
  constructor(
    @InjectConnection(dbConnection.connexion1.name)
    private connection1: Connection,
    @InjectEntityManager(dbConnection.connexion1.name)
    private entityManager1: EntityManager,
    @InjectConnection(dbConnection.connexion2.name)
    private connection2: Connection,
    @InjectEntityManager(dbConnection.connexion2.name)
    private entityManager2: EntityManager,
  ) {}

  private logger = new Logger('ValidationBlRepository');

  async retrieveLigDocument(docNumero: string): Promise<Document> {
    try {
      const document: Document = await this.connection1.query(
        queries.retrieveLigDocument,
        [docNumero],
      );
      return document;
    } catch (error) {
      this.logger.error(
        `Echec pour la recuperation de docLig avec le numero  "${docNumero}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async retrieveDocuments(): Promise<Document[]> {
    //const result: Document[] = await this.connection1.query(queries.retrieveDocuments);
       
    return await this.connection1.query(queries.retrieveDocuments).then(docs => {
        const documents : Document[] =[] ; 
        docs.forEach(doc => {
            const d :Document = new Document();
        d.docDate = doc["docdate"] ? doc["docdate"] : null ;
        d.docMemo = doc["docmemo"] ? doc["docmemo"] : null ;
        d.docMtTtc = doc["docmtttc"] ? doc["docmtttc"] : null ;
        d.docNumero = doc["docnumero"] ? doc["docnumero"] : null ;
        d.docPiece = doc["docpiece"] ? doc["docpiece"] : null ;
        d.docStype = doc["docstype"] ? doc["docstype"] : null ;
        d.pcfCode = doc["pcfcode"] ? doc["pcfcode"] : null ;
        console.log("document ==> " , d);
        documents.push(d);
        }) ;
        return new Promise((resolse , reject) =>{
            resolse(documents);
        } ) ;
    });   
    // console.log(result);
    // return documents;
  }

  async insertDocument(document: Document): Promise<Document> {
    console.log('Post Repository ---> ', document);
    const doc: Document = { ...document };
    try {
      await this.connection1.query(queries.insertDocument, [
        doc.docNumero,
        doc.docPiece,
        doc.docStype,
        doc.pcfCode,
        +doc.docMtTtc,
        doc.docMemo,
      ]);
    } catch (error) {
      this.logger.error(
        `Impossible de creer le document "${document.docNumero}". Data: ${document}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    return doc;
    // const result: any = await this.connection1.query(queries.insertDocument, {
    //     ':docNumero': document.docNumero,
    //     ':docPiece': document.docPiece,
    //     ':docStype': document.docStype,
    //     ':pcfCode': document.pcfCode,
    //     ':docMtTtc': +document.docMtTtc,
    //   } as any);
    //return result ;
  }

  async updateDocument(docNumero: number): Promise<number> {
    try {
      await this.connection1.query(queries.updateDocument, [docNumero]);
      return docNumero;
    } catch (error) {
      this.logger.error(
        `Impossible de modifier le document  "${docNumero}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async insertLigDocument(
    ligneDocument: LigneDocument,
  ): Promise<LigneDocument> {
    try {
      await this.connection1.query(queries.insertLigDocument, [
        ligneDocument.docNumero,
        ligneDocument.artCode,
        ligneDocument.ligQte,
      ]);
      return ligneDocument;
    } catch (error) {
      this.logger.error(
        `Impossible de creer la ligneDocument "${JSON.stringify(
          ligneDocument,
        )}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
