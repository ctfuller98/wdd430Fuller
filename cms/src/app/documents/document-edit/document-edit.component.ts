import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm} from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document
  document: Document
  editMode: boolean = false
  id: string;
  constructor(private documentService: DocumentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=> {
        this.id = params['id']
        if(this.id===null || this.id==undefined){
          this.editMode = false;
          return
        }
        this.originalDocument = this.documentService.getDocument(this.id)
        if(this.originalDocument == undefined || this.originalDocument==null){
            return}
        this.editMode = true
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        
      })
    } 
  
  onCancel() {
    this.router.navigate(['/documents'])
  }
  onSubmit(form: NgForm){
      const value = form.value
      const newDocument = new Document(this.id, value.name, value.description, value.url, null); 
      if (this.editMode === true){
        this.documentService.updateDocument(this.originalDocument, newDocument)
      } 
      else {
        this.documentService.addDocument(newDocument)
      }
      this.router.navigate(['/documents'])
  }
}
