import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Inject
} from '@nestjs/common';
import { InjectConnection, InjectEntityManager } from '@nestjs/typeorm';
import { Connection, EntityManager } from 'typeorm';
import { dbConnection } from '../config/datasource.config';
import { queries } from '../config/queries';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';
import { DatabaseConfigurationService } from 'src/configuration/datatbase-configuration.service';

@Injectable()
export class ValidationBlRepository {
  constructor(
    @InjectConnection(dbConnection.connexion1.name)
    private connection1: Connection,
    @InjectEntityManager(dbConnection.connexion1.name)
    private entityManager1: EntityManager, 
    @Inject("DatabaseConfigurationService")   
    private dbConfig :DatabaseConfigurationService    
  ) {

  }

  private logger = new Logger('ValidationBlRepository');

  async retrieveLigDocument(docNumero: string , connectionName : string): Promise<LigneDocument> {
    const connection = await this.dbConfig.getDatabaseConnectionbyName(connectionName) ;
    try {
      const document: LigneDocument = await connection.query(
        queries.retrieveLigDocument,
        [docNumero],
      );
      return this.mapperLigneDocument(document);

    } catch (error) {
      this.logger.error(
        `Echec pour la recuperation de docLig avec le numero  "${docNumero}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }


  async retrieveDocuments(connectionName : string ): Promise<Document[]> {
    console.log('retrieveDocuments -------------> ', connectionName) ;
    const connection = await this.dbConfig.getDatabaseConnectionbyName(connectionName) ;
    // const result: Document[] = await this.connection1.query(queries.retrieveDocuments);
    const result: Document[] = await connection.query(queries.retrieveDocuments);
    let docs : Document[];
    docs = result.map((doc) => {
      return this.mapperDocument(doc);
    }); 
    return docs;
  }

  async insertDocument(document: Document ,connectionName : string): Promise<Document> {
    console.log('Post Repository ---> ', document);
    const doc: Document = { ...document };
    try {
      const connection = await this.dbConfig.getDatabaseConnectionbyName(connectionName) ;
      await connection.query(queries.insertDocument, [
        doc.docNumero,
        doc.docPiece,
        doc.docStype,
        doc.pcfCode,
        +doc.docMtTtc,
        doc.docMemo,
      ]);

      return doc;
    } catch (error) {
      this.logger.error(
        `Impossible de creer le document "${document.docNumero}". Data: ${document}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateDocument(docNumero: number , connectionName:string ): Promise<number> {
    try {
      const connection = await this.dbConfig.getDatabaseConnectionbyName(connectionName) ;
      await connection.query(queries.updateDocument, [docNumero]);
      return docNumero;
    } catch (error) {
      this.logger.error(
        `Impossible de modifier le document  "${docNumero}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async insertLigDocument( ligneDocument: LigneDocument, connectionName : string  ): Promise<LigneDocument> {
    try {
      const connection = await this.dbConfig.getDatabaseConnectionbyName(connectionName) ;
      await connection.query(queries.insertLigDocument, [
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

  mapperDocument(rs :any) :Document {
    const d:Document = new Document();
          // ,doc_f_rs ,  , statut
    d.docDate = rs["doc_date"] ? rs["doc_date"] : null ;
    // d.docMemo = rs["docmemo"] ? rs["docmemo"] : null ;
    d.docMtTtc = rs["doc_mt_ttc"] ? rs["doc_mt_ttc"] : null ;
    d.docNumero = rs["doc_numero"] ? rs["doc_numero"] : null ;
    d.docPiece = rs["doc_piece"] ? rs["doc_piece"] : null ;
    d.docStype = rs["doc_stype"] ? rs["doc_stype"] : null ;
    d.pcfCode = rs["pcf_code"] ? rs["pcf_code"] : null ;
    
    return d ;
  }

  mapperLigneDocument(rs: any) :LigneDocument{
    const ligne :LigneDocument= new LigneDocument();
    ligne.artCode = rs["art_code"] ? rs["art_code"] : null ;
    ligne.docNumero = rs["doc_numero"] ? rs["doc_numero"] : null ;
    ligne.ligQte = rs["lig_qte"] ? rs["lig_qte"] : null ;
    return ligne ;
  }
}
