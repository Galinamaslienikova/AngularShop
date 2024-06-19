import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemInCart } from '../../types/types';
import { GlobalStateService } from '../../state/global-state.service';
import { TshirtComponent } from '../common/tshirt/tshirt.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { PricePipe } from '../../helpers/price/price.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgFor,
    TshirtComponent,
    FooterComponent,
    HeaderComponent,
    PricePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  items: ItemInCart[] = [];
  isLoading: boolean = true;
  total: number = 0;
  constructor(private globalState: GlobalStateService) {}
  ngOnInit(): void {
    this.globalState.cart$.subscribe({
      next: (data) => {
        this.items = data;
        this.total = data.reduce(
          (accumulator, item) => accumulator + item.count * item.price,
          0
        );
      },
      error: (error) => console.log(error),
      complete: () => (this.isLoading = false),
    });
  }
}
