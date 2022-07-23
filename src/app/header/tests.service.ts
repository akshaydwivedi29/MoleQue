import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { data } from 'autoprefixer';

export interface TestList {
  _id: string;
  testcode: string;
  testname: string;
  price: string;
  status: string;
  Department: string;
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
