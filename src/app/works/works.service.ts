import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';

@Injectable()
export class WorksService {
  works;

  constructor(private http:Http) {
  }

  getWork() {
    return this.http.get('./data/work.json')
      .map(res => res.json())
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }
}