import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../models/employee.model';

@Injectable()
export class FormPoster {
  constructor(private http: Http) {}

  private extractLanguages(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { }; // fields is what the server uses to put all of the form's posted fields
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }

  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:3100/get-languages')
      // .delay(2000) could use this to simulate a delay to a real service
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  postEmployeeForm(employee: Employee):Observable<any> {
    let body = JSON.stringify(employee);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });

    return this.http.post('http://localhost:3100/postemployee', body, options) // this won't work unless there is a subscriber(home.component.ts)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
