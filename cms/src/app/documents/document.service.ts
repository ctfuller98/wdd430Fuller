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
    this.getDocuments();
    this.maxDocumentId = this.getMaxId();
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
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments()
 }
 
addDocument(newDocument: Document) {
  if(newDocument == undefined || newDocument == null){
    console.log("undefined document")
    return
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument)
  this.storeDocuments()
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if(!originalDocument || !newDocument|| originalDocument === null || newDocument === null) {
    return
  }
  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return
  }
  newDocument.id = originalDocument.id
  this.documents[pos] = newDocument
  this.storeDocuments();
}
private fetchDocuments(){
  this.httpClient.get('https://wdd430cms-e579c-default-rtdb.firebaseio.com/documents.json')
  .subscribe (
    (documents:Document[]) => {
      this.documents = documents
      this.maxDocumentId = this.getMaxId()
      let list = this.documents.sort();
      this.documentListChangedEvent.next(list)
    },
    (error:any) => {
      console.log(error)
      }
    )
  }
storeDocuments() {
  const docList = JSON.stringify(this.documents);
  this.httpClient.put('https://wdd430cms-e579c-default-rtdb.firebaseio.com/documents.json', docList,
  {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  })
  .subscribe(response=>{
    let documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)
  })
}
}
