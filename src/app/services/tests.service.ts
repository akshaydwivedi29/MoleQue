import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  searchTestList(testName:string){
    return this.http.get<TestList[]>(`${environment.serverURL}search/${testName}`)
  }

  getTestDetail(testId:string){
    return this.http.get<TestList>(`${environment.serverURL}search/testDetails/${testId}`)
  }

  sortAsc(){
    return this.http.get(`${environment.serverURL}search/testLists/sortAsc`)
  }

  sortDesc(){
    return this.http.get(`${environment.serverURL}search/testLists/sort/sortDesc`)
  }

  sortHtoL(){
    return this.http.get(`${environment.serverURL}search/testLists/sortByPrice/highToLow`)
  }

  
}
