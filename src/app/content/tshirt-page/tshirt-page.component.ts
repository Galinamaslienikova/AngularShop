import { Item } from '../../types/types';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentServerService } from '../server/content-server.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { TshirtComponent } from '../common/tshirt/tshirt.component';

@Component({
  selector: 'app-tshirt-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NgIf,
    MatProgressSpinnerModule,
    TshirtComponent,
  ],
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
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: ContentServerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.http.getOneTshirt(this.id).subscribe(
      (data) => {
        this.tshirt = data[0];
      },
      null,
      () => {
        this.isLoading = false;
      }
    );
  }
}
