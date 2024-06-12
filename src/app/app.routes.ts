import { ContentComponent } from './content/contentComponent/content.component';
import { TshirtPageComponent } from './content/tshirt-page/tshirt-page.component';
import { Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CartComponent } from './content/cart/cart.component';

export const routes: Routes = [
  { path: '', component: MainpageComponent },
  {
    path: 'tshirts',
    component: ContentComponent,
  },
  { path: 'tshirts/:id', component: TshirtPageComponent },
  { path: 'cart', component: CartComponent },
];
