import { Item, ItemInCart } from '../../../types/types';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GlobalStateService } from '../../../state/global-state.service';
import { PricePipe } from '../../../helpers/price/price.pipe';

@Component({
  selector: 'app-tshirt',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PricePipe],
  templateUrl: './tshirt.component.html',
  styleUrl: './tshirt.component.scss',
})
export class TshirtComponent implements OnInit {
  @Input() tshirt!: Item;
  count: number = 0;
  constructor(private globalState: GlobalStateService) {}

  ngOnInit(): void {
    this.globalState.cart$.subscribe((data) => {
      const item: ItemInCart = data.filter(
        (item) => item.id === this.tshirt.id
      )[0];
      if (item) {
        this.count = item.count;
      } else {
        this.count = 0;
      }
    });
  }

  removeItem() {
    this.globalState.removeOneItem(this.tshirt.id);
  }
  addItem() {
    this.globalState.addItem(this.tshirt);
  }
}
