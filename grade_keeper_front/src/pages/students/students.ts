import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import {StudentsProvider} from '../../providers/students/students'

/**
 * Generated class for the StudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-students',
  templateUrl: 'students.html',
})
export class StudentsPage implements OnInit {
assignment ={};
formVar: FormGroup;

value:any;
studentList: Observable<any>;
lengthList:Observable<any>;
lengthArray: Array<any>;
studentArray: Array<any>;
  first: any;
  public buttonClicked: boolean = false; //Whatever you want to initialise it as

  last: any;
  http: any;
  assignmentArray: FormGroup;
  lengthUnit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient,private fb: FormBuilder, private studentService: StudentsProvider) {
    this.value = navParams.get('student');
    console.log(this.value.studentId);
    this.first = this.value.studentFirst;
    this.last = this.value.studentLast;
    this.logUser();
  }

 logUser(){
  
 }

  onSubmit() {
    console.log(this.formVar.value);
  }

  ngOnInit(){
    this.formVar = this.fb.group({
      id: 15,
      studentId: this.value.studentId,
      assignmentname: '',
      grade: 0,
    });
    this.assignmentArray = this.formVar;
    console.log(this.assignmentArray.value.studentId)
  }
  createProduct(){

    const req = this.httpClient.post('http://localhost:3000/assignments', {
        assignmentname: this.assignmentArray.value.assignmentname,
        grade: this.assignmentArray.value.grade,
        studentId: this.assignmentArray.value.studentId,
        id: this.lengthUnit + 1
      })
        .subscribe(
          res => {
            console.log(res);
            this.initPull();
          },
          err => {
            console.log("Error occured");
          }
        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentsPage');
    this.initPull();

  }

  public onButtonClick() {

      this.buttonClicked = !this.buttonClicked;
  }
  onSubmitClick(){
    this.assignment = this.formVar;
    console.log(this.assignment)
  }

  initPull(){
    this.studentList = this.httpClient.get(`http://localhost:3000/assignments/${this.value.studentId}/single` );
    this.studentList.subscribe(data => {
      console.log(data.result);
      this.studentArray = data.result;
    })
    this.lengthList = this.httpClient.get(`http://localhost:3000/assignments`);
    this.lengthList.subscribe(result => {
      console.log(result.data.length);
      this.lengthUnit = result.data.length;
    })
    
  }
}
