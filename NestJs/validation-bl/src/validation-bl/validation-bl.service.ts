import { Injectable } from '@nestjs/common';
import { ValidationBlRepository } from './validation-bl.repository';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';

@Injectable()
export class ValidationBlService {
  constructor(private validatioRepository: ValidationBlRepository) {}

  async getDocuments(connectionName : string ): Promise<Document[]> {
    return this.validatioRepository.retrieveDocuments(connectionName);
  }

  async insertDocument(document: Document , connectionName : string ): Promise<Document> {
    return this.validatioRepository.insertDocument({ ...document } , connectionName);
  }

  async retrieveLigDocument(docNumero: string , connectionName :string): Promise<LigneDocument> {
    return this.validatioRepository.retrieveLigDocument(docNumero ,connectionName);
  }

  async insertLigDocument(ligneDocument: LigneDocument , connectionName : string ): Promise<LigneDocument> {
    return this.validatioRepository.insertLigDocument({ ...ligneDocument } , connectionName);
  }

  async updateDocument(docNumero: number , connectionName : string ): Promise<number> {
    return this.validatioRepository.updateDocument(docNumero , connectionName);
  }
}
