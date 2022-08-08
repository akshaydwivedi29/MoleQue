import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface TestList {
  _id: string;
  testcode: string;
  testname: string;
  alias: string;
  department: string;
  checktime: string;
  tat: string;
  instructions: string;
  description: string;
  symptoms: string;
  price: string;
  stability: string;
  temperature: string;
  method: string;
  specimen: string;
  tags: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  constructor(private http: HttpClient) {}

  searchTestList(query: string) {
    return this.http
      .post<{ payload: Array<TestList> }>(
        '/api/getTestList',
        { payload: query },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .pipe(map((data) => data.payload));
  }
}
