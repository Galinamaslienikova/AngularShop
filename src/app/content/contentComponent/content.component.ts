import { Component } from '@angular/core';
import { CardListComponent } from './card-list/card-list.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  imports: [CardListComponent, RouterOutlet, HeaderComponent, FooterComponent],
})
export class ContentComponent {}
