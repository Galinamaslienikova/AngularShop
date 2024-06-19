import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  URL = 'api/';

  constructor(private http: HttpClient) {}

  getTshirts() {
    return this.http.get<Item[]>(this.URL + 'tshirts');
  }

  getOneTshirt(id: string) {
    return this.http.get<Item[]>(this.URL + `tshirts?id=${id}`);
  }
}
