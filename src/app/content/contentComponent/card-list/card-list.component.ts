import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ContentService } from '../../content-service/content-service.service';
import { Item } from '../../../types/types';
import { CardComponent } from '../card/card.component';
import { NgFor, NgIf } from '@angular/common';
import { GlobalStateService } from '../../../state/global-state.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CardComponent,
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit, DoCheck {
  constructor(
    private contentServer: ContentService,
    private globalState: GlobalStateService
  ) {}
  defaultList: Item[] = [];
  list: Item[] = [];
  search: string = '';
  isLoading: boolean = true;
  sortValue = new FormControl('name');
  pageSize = 4;
  pageIndex = 0;

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  handleSelectChange() {
    this.pageIndex = 0;
  }

  sortListItems(sortedList: Item[]) {
    switch (this.sortValue.value) {
      case 'name':
        return sortedList.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      case 'priceLow':
        return sortedList.sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return sortedList.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
      default:
        return sortedList;
    }
  }

  ngDoCheck(): void {
    let sortedList: Item[] = [];
    if (this.search) {
      sortedList = this.defaultList.filter((item) =>
        item.name.includes(this.search)
      );
    } else {
      sortedList = this.defaultList;
    }

    this.list = this.sortListItems(sortedList).slice(
      this.pageIndex * this.pageSize,
      this.pageIndex * this.pageSize + this.pageSize
    );
  }

  ngOnInit(): void {
    this.contentServer.getTshirts().subscribe({
      next: (res) => {
        this.list = res;
        this.defaultList = res;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
    this.globalState.search$.subscribe((data) => (this.search = data));
  }
}
