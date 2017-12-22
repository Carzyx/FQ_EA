import { Component, Input } from '@angular/core';
import "rxjs/add/operator/map";
import { FormsModule } from "@angular/forms";
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';

import { StudentDetailPage } from '../studentDetail/studentDetail';


@Component({
  selector: 'app-subjectDetail',
  templateUrl: './subjectDetail.html'
})
export class SubjectDetailPage {
  @Input() subject: Subject;
  private hideElement: boolean = false;

  constructor() {
  }
 
  showHide() {
    if (this.hideElement) {
      this.hideElement = false;
    }
    else{
      this.hideElement = true;
    }
  } 
  
}
