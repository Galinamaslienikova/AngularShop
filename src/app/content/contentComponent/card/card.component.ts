import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GlobalStateService } from '../../../state/global-state.service';
import { Item } from '../../../types/types';
import { RouterLink } from '@angular/router';
import { PricePipe } from '../../../helpers/price/price.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, PricePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  constructor(private globalState: GlobalStateService) {}

  isInCart: boolean = false;

  @Input() item!: Item;

  ngOnInit(): void {
    this.globalState.cart$.subscribe(
      (data) =>
        (this.isInCart = !!data.find((item) => item.id === this.item.id))
    );
  }

  addToCart() {
    this.globalState.addItem(this.item);
  }

  removeFromCart() {
    this.globalState.removeItem(this.item.id);
  }
}
