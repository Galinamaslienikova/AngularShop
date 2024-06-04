import { Item } from './../types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentServerService } from '../server/content-server.service';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-tshirt-page',
  standalone: true,
  imports: [MatCardModule, HeaderComponent, FooterComponent],
  templateUrl: './tshirt-page.component.html',
  styleUrl: './tshirt-page.component.scss',
})
export class TshirtPageComponent implements OnInit {
  id: string = '';
  tshirt: Item = {
    picture: '',
    name: '',
    id: '',
    price: 0,
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private http: ContentServerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log('this.id', this.id);
    this.http.getOneTshirt(this.id).subscribe((data) => {
      this.tshirt = data[0];
      console.log('data', data);
    });
  }
}
