import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { tshirts } from '../src/data';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService implements InMemoryDbService {
  constructor() {}
  createDb(): {} | Observable<{}> | Promise<{}> {
    console.log('databasesreffag');
    return { tshirts };
  }
}
