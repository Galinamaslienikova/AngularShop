import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ContentServerService {
  URL = 'api/';

  constructor(private http: HttpClient) {}

  getTshirts() {
    console.log('getTshirts', this.URL,this.http.get<Item[]>(this.URL + 'tshirts'));
    return this.http.get<Item[]>(this.URL + 'tshirts');
  }

  getOneTshirt(id: string) {
    console.log('getOneTshirt', id, this.URL);
    return this.http.get<Item[]>(this.URL + `tshirts?id=${id}`);
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
