import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ContentServerService } from '../server/content-server.service';
import { Item } from '../types';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import { GlobalStateService } from '../../global-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit, DoCheck, OnDestroy {
  constructor(
    private contentServer: ContentServerService,
    private globalState: GlobalStateService
  ) {}
  defaultList: Item[] = [];
  list: Item[] = [];
  search: string = '';
  private ngUnsubscribe = new Subject<void>();

  ngDoCheck(): void {
    if (this.search) {
      this.list = this.defaultList.filter((item) =>
        item.name.includes(this.search)
      );
    } else {
      this.list = this.defaultList;
    }
  }

  ngOnInit(): void {
    console.log(' ngOnInit CardListComponent', this.contentServer);
    this.contentServer
      .getTshirts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log('res', res);
        this.list = res;
        this.defaultList = res;
      });
    this.globalState.search$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => (this.search = data));

    this.contentServer
      .getPosts()
      .subscribe((data) => console.log('posts', data));
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
