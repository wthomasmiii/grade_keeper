import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Assignment } from '../../app/models/assignment.model';


/*
  Generated class for the StudentsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StudentsProvider Provider');
  }
// Get list of products from remote server.
    getStudents(): Observable<Assignment[]>{
 
        return this.http
            .get("http://localhost/assignments")
            .pipe(map((res: Response) => res.json()));
    }
    
// Send product data to remote server to create it.


  }
