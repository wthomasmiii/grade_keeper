import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Assignment } from '../../app/models/assignment.model';
import {StudentsProvider} from '../../providers/students/students'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {StudentsPage} from '../../pages/students/students';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  assignmentList: Observable<any>;
  assignmentArray: Array<any>;

  studentList: Observable<any>;
  studentArray: Array<any>;

  constructor(public navCtrl: NavController, private studentsProvider: StudentsProvider, public httpClient: HttpClient) 
  {

  
   
//get the student list related to this specific user
this.studentList = this.httpClient.get('http://localhost:3000/teacher/1');
this.studentList.subscribe(data => {
  console.log(data.result)
  this.studentArray = data.result;
})


  }
  ngOnInit(){
}

ngOnEnter(){
  
}

openDetails(student) {
  this.navCtrl.push('StudentAssignmentPage', {student: student});
}
log(objButton){
  alert(objButton.value);

}
itemTapped(event, student) {
  // That's right, we're pushing to ourselves!
  this.navCtrl.push(StudentsPage, {
  student: student
  });
  console.log(student);
}
}
