import {Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
documents: Document[] = [];
documentListChangedEvent = new Subject<Document[]>();
maxId: number;
currentId: number;
maxDocumentId: number;
  constructor(private httpClient: HttpClient) { 
  }
  
  getDocuments(): Document[]{
     this.fetchDocuments()
     return
  }
  getDocument(id: string): Document {
    for (let i = 0; i < this.documents.length; i++) {
      if(this.documents[i].id == id){
        return this.documents[i];
      }
    }
    return null;
  } 
  getMaxId(): number {
    this.maxId = 0;
    this.documents.forEach(document => {
      this.currentId = parseFloat(document.id)
      if (this.currentId > this.maxId){
        this.maxId = this.currentId;
      }
    });
    return this.maxId
}
deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.httpClient.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
}
 
 addDocument(document: Document) {
  if (!document) {
    return;
  }
  // make sure id of the new Document is empty
  document.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  // add to database
  this.httpClient.post<{ message: string, document: Document }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(responseData.document)
        console.log(this.documents)
        // add new document to documents
        this.documents.push(responseData.document);
        console.log(this.documents)
        this.sortAndSend();
      }
    );
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  //newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.httpClient.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );
}
private fetchDocuments(){
  this.httpClient.get('http://localhost:3000/documents')
      .subscribe ({
        next: (documents: any) => {
          console.log(documents)
          this.documents = documents.documents
          this.maxDocumentId = this.getMaxId()
          let list = this.documents.sort();
          this.documentListChangedEvent.next(list)
        },
        error: (e) => console.log(e.message),
      });
  }
  sortAndSend() {
    const docList = JSON.stringify(this.documents)
    let documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)

  }
}
