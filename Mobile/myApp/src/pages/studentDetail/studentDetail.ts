import { Component, Input } from '@angular/core';
import "rxjs/add/operator/map";
import { Student } from '../../models/student';

@Component({
  selector: 'app-studentDetail',
  templateUrl: './studentDetail.html'
})
export class StudentDetailPage {
  @Input() student: Student;
  
  private hideElement: boolean = true;

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
