import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { FormsModule } from "@angular/forms";
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';

import { SubjectDetailComponent } from '../subjectDetail/subjectDetail.component';


@Component({
  selector: 'app-resum',
  templateUrl: './resum.component.html',
  styleUrls: ['./resum.component.css']
})

export class ResumComponent implements OnInit {
  private subjects;
  private students;
  private copySubjects;
  private copyStudents;

  private filterTags = [
    { "option": "QT" },
    { "option": "Subject name" },
    { "option": "Students quatity" }
  ];

  private optionFilter = [
    { "QT": "QT1" },
    { "QT": "QT2" },
    { "Subject name": "A to Z" },
    { "Subject name": "Z to A" },
    { "Subject name": "Specific name" },
    { "Students quatity": "ascending" },
    { "Students quatity": "descending" }
  ];


  //ShowHide
  private hideElement: boolean = false;
  private showStudent = true;
  private showSubject = false;
  private tagSelected;

  constructor(private http: HttpClient) {
    this.subjects = this.getSubjects()
    this.students = this.getStudents()
    this.copySubjects = this.getSubjects()
  }

  ngOnInit() {
  }

  changeShowStatus() {
    this.showStudent = !this.showStudent;
    this.showSubject = !this.showSubject;
  }

  getSubjects() {
    this.http.get('http://localhost:3001/subject')
      .subscribe(res => {
        console.log(res);
        this.subjects = res;
        this.copySubjects = res;
      });
  }
  getStudents() {
    this.http.get('http://localhost:3001/student')
      .subscribe(res => {
        console.log(res);
        this.students = res;
        this.copyStudents = res;
      });
  }

  matriculate(subject, student) {
    var mySubject = this.copySubjects.find(s => s.name == subject)
    var myStudent = this.copyStudents.find(s => s.name == student)
    mySubject.students.push(student);
    mySubject.id = subject['_id']
    console.log(JSON.stringify(mySubject));
    this.http.put('http://localhost:3001/subject', JSON.stringify(mySubject), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(data => {
        this.update();
      });
  }

  update() {
    this.getSubjects()
    this.getStudents()
  }
  orderSubjectBy(tag, option, subjName) {
    this.subjects = this.copySubjects;
    this.students = this.copyStudents;

    if (tag == "QT") {
      this.subjects = this.subjects.filter(obj => obj.qt == option);
    }
    if (tag == "Subject name" && option == "A to Z") {
      this.subjects = this.orderSubjectByName(true)
    }
    if (tag == "Subject name" && option == "Z to A") {
      this.subjects = this.orderSubjectByName(false)
    }

    if (tag == "Subject name" && option == "Specific name") {
      this.subjects = this.subjects.filter(obj => obj.name == subjName);
    }

    if (tag == "Students quatity" && option == "ascending") {
      this.subjects = this.orderStudentByQuantity(true);
    }

    if (tag == "Students quatity" && option == "descending") {
      this.subjects = this.orderStudentByQuantity(false);
    }

  }

  
  clearFilter() {
    this.subjects = this.copySubjects;
    this.students = this.copyStudents;
  }

  transform(array, orderBy, asc = true) {

    if (!orderBy || orderBy.trim() == "") {
      return array;
    }

    //ascending
    if (asc) {
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item1[orderBy], item2[orderBy]);
      });
    }
    else {
      //not asc
      return Array.from(array).sort((item1: any, item2: any) => {
        return this.orderByComparator(item2[orderBy], item1[orderBy]);
      });
    }

  }

  orderStudentByQuantity(ascending) {
    if (ascending) {
      return Array.from(this.subjects).sort((item1: any, item2: any) => {
        return this.orderByComparator(item2.students.length, item1.students.length);
      });
    }
    else{
      return Array.from(this.subjects).sort((item1: any, item2: any) => {
        return this.orderByComparator(item1.students.length, item2.students.length);
      });
    }
  }

  orderSubjectByName(AtoZ) {
    if (AtoZ) {
      return Array.from(this.subjects).sort((item1: any, item2: any) => {
        return this.orderByComparator(item1.name, item2.name);
      });
    }
    else{
      return Array.from(this.subjects).sort((item1: any, item2: any) => {
        return this.orderByComparator(item2.name, item1.name);
      });
    }
  }

  orderByComparator(a: any, b: any): number {

    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
      //Isn't a number so lowercase the string to properly compare
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else {
      //Parse strings as numbers to compare properly
      if (parseFloat(a) < parseFloat(b)) return -1;
      if (parseFloat(a) > parseFloat(b)) return 1;
    }

    return 0; //equal each other
  }

  onChange(){
    
  }
}
