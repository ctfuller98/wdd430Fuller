import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[] = [];
documentSelectedEvent = new EventEmitter<Document>();
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }
  getDocuments(): Document[]{
    let list = this.documents.sort();
    return list.slice();
  }
  getDocument(id: string): Document {
    this.documents.forEach(element => {
      if (element.id == id) {
        return element;
      }
      
    }); 
    return null;
  } 
}
