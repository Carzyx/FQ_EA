import { Component } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavController } from 'ionic-angular';

import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { Phone } from '../../models/phone';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.html'
})
export class CrudPage {
  private subjects;
  private students;

  private studentSelected;
  private subjectSelected;
  private data: Subject;
  private dataStudent: Student;

  //ShowHide
  private showStudent = true;
  private showSubject = false;

  constructor(private http: HttpClient, public navCtrl: NavController) {
    this.subjects = this.getSubjects()
    this.students = this.getStudents()
    console.log(this.students);
    console.log(this.subjects);
    this.data = new Subject();
    this.dataStudent = new Student();
    console.log(this.data);
  }

  changeShowStatus() {
    this.showStudent = !this.showStudent;
    this.showSubject = !this.showSubject;
  }

  createStudent(name, address, phoneName, phoneNumber) {
    this.dataStudent.name = name
    this.dataStudent.address = address

    var phone = new Phone();
    phone.name = phoneName;
    phone.phoneNumber = phoneNumber;

    this.dataStudent.phone = new Array<Phone>();
    this.dataStudent.phone.push(phone);

    this.http.post('http://localhost:3001/student', JSON.stringify(this.dataStudent), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(data => {
        console.log(data)
        this.getStudents();
      });
  }

  createSubject(name, description, qt) {
    this.data.name = name;
    this.data.description = description;
    this.data.qt = qt;
    this.http.post('http://localhost:3001/subject', JSON.stringify(this.data), { headers: new HttpHeaders().set('Content-Type', 'application/json') })
      .subscribe(data => {
        console.log(data)
        this.getSubjects;
      });
  }

  removeStudent(student) {
    this.studentSelected = student;
    alert(JSON.stringify(this.studentSelected));
  }

  removeSubject(subject) {
    this.subjectSelected = subject;
    alert(JSON.stringify(this.subjectSelected));
  }

  getSubjects() {
    this.http.get('http://localhost:3001/subject')
      .subscribe(res => {
        console.log(res);
        this.subjects = res;
      });
  }
  getStudents() {
    this.http.get('http://localhost:3001/student')
      .subscribe(res => {
        console.log(res);
        this.students = res;
      });
  }

}
