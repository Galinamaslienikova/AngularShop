import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GlobalStateService } from '../../global-state.service';
import { Item } from '../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  constructor(private globalState: GlobalStateService) {}

  isInCart: boolean = false;

  @Input() item: Item = {
    picture: '',
    name: '',
    id: '',
    price: 0,
    description: '',
  };

  ngOnInit(): void {
    this.globalState.cart$.subscribe(
      (data) =>
        (this.isInCart = !!data.find((item) => item.id === this.item.id))
    );
  }

  addToCart(item: Item) {
    this.globalState.addItem(this.item);
  }

  removeFromCart(id: string) {
    this.globalState.removeItem(id);
  }
}
