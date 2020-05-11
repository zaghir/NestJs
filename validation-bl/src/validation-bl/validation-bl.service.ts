import { Injectable } from '@nestjs/common';
import { ValidationBlRepository } from './validation-bl.repository';
import { Document } from './dto/document.dto';
import { LigneDocument } from './dto/ligne-document.dto';

@Injectable()
export class ValidationBlService {
  constructor(private validatioRepository: ValidationBlRepository) {}

  async getDocuments(): Promise<Document[]> {
    return this.validatioRepository.retrieveDocuments();
  }

  async insertDocument(document: Document): Promise<Document> {
    return this.validatioRepository.insertDocument({ ...document });
  }

  async retrieveLigDocument(docNumero: string): Promise<Document> {
    return this.validatioRepository.retrieveLigDocument(docNumero);
  }

  async insertLigDocument(
    ligneDocument: LigneDocument,
  ): Promise<LigneDocument> {
    return this.validatioRepository.insertLigDocument({ ...ligneDocument });
  }

  async updateDocument(docNumero: number): Promise<number> {
    return this.validatioRepository.updateDocument(docNumero);
  }
}
