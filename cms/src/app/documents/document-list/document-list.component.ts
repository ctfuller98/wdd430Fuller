import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output()  selectedDocumentEvent = new EventEmitter<Document>();
  documents:Document[] = [
    new Document(1, "Test File 1", "First Test File", "url.org", null),
    new Document(2, "Test File 2", "Second Test File", "url.org", null),
    new Document(3, "Test File 3", "Third Test File", "url.org", null),
    new Document(4, "Test File 4", "Fourth Test File", "url.org", null),
    new Document(5, "Test File 5", "Fifth Test File", "url.org", null)
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document)
  }

}
