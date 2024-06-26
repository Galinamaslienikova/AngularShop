import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  DoCheck,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { GlobalStateService } from '../state/global-state.service';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

const icon = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
    height="800px"
    width="800px"
    version="1.1"
    id="Layer_1"
    viewBox="0 0 512.001 512.001"
    xml:space="preserve"
  >
    <g>
      <g>
        <path d="M511.937,484.574l-25.609-358.4c-0.956-13.397-12.1-23.774-25.532-23.774h-102.4c0-56.559-45.841-102.4-102.4-102.4    c-56.559,0-102.4,45.841-102.4,102.4h-102.4c-13.431,0-24.576,10.377-25.532,23.774l-25.6,358.4    c-0.503,7.091,1.954,14.071,6.801,19.268C11.704,509.048,18.488,512,25.596,512h460.8c7.108,0,13.892-2.953,18.739-8.158    C509.974,498.646,512.44,491.666,511.937,484.574z M345.596,179.201c7.057,0,12.8,5.743,12.8,12.8s-5.743,12.8-12.8,12.8    s-12.8-5.743-12.8-12.8S338.539,179.201,345.596,179.201z M255.996,25.6c42.351,0,76.8,34.449,76.8,76.8h-153.6    C179.196,60.058,213.645,25.6,255.996,25.6z M166.396,179.201c7.057,0,12.8,5.743,12.8,12.8s-5.743,12.8-12.8,12.8    s-12.8-5.743-12.8-12.8S159.339,179.201,166.396,179.201z M25.596,486.401l25.6-358.4h102.4v27.947    c-14.882,5.291-25.6,19.354-25.6,36.053c0,21.205,17.195,38.4,38.4,38.4c21.205,0,38.4-17.195,38.4-38.4    c0-16.691-10.718-30.763-25.6-36.053v-27.947h153.6v27.947c-14.882,5.291-25.6,19.354-25.6,36.053c0,21.205,17.195,38.4,38.4,38.4    c21.205,0,38.4-17.195,38.4-38.4c0-16.691-10.718-30.763-25.6-36.053v-27.947h102.4l25.6,358.4H25.596z" />
      </g>
    </g>
    <g>
      <g>
        <polygon points="365.598,350.302 312.871,364.399 281.042,346.002 312.871,327.604 364.216,341.351 365.598,341.726     372.067,317.551 343.565,309.897 360.419,300.178 348.566,279.723 347.841,278.503 331.073,288.222 338.667,259.73     314.492,253.253 300.37,305.946 268.498,324.327 268.498,287.523 304.449,251.572 307.12,249.003 289.37,231.254 268.498,252.126     268.498,232.705 243.469,232.705 243.469,252.126 222.597,231.254 204.873,248.978 243.469,287.523 243.469,324.327     211.597,305.946 197.842,254.601 197.492,253.253 174.648,259.38 173.291,259.73 180.92,288.197 164.118,278.503 151.574,300.178     168.419,309.897 141.274,317.202 139.917,317.551 146.044,340.378 146.394,341.726 199.096,327.604 230.942,346.002     199.096,364.399 147.768,350.678 146.394,350.302 139.917,374.477 168.419,382.123 151.574,391.826 164.118,413.526     180.92,403.823 173.291,432.299 197.492,438.776 211.597,386.074 243.469,367.702 243.469,404.498 204.899,443.051     222.597,460.801 243.469,439.928 243.469,459.324 268.498,459.324 268.498,439.902 289.37,460.801 307.094,443.051     268.498,404.498 268.498,367.702 300.37,386.074 313.52,435.226 314.518,438.776 337.319,432.649 338.667,432.299     331.047,403.823 347.866,413.526 360.419,391.826 343.565,382.123 370.718,374.827 372.067,374.477 365.948,351.651   " />
      </g>
    </g>
  </svg>
);`;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatBadgeModule, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() isSearchShow: boolean = true;
  searchValue: string = '';
  count: number = 0;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private globalState: GlobalStateService
  ) {
    iconRegistry.addSvgIconLiteral(
      'thumbs-up',
      sanitizer.bypassSecurityTrustHtml(icon)
    );
  }

  ngOnInit(): void {
    this.globalState.search$.subscribe((data) => (this.searchValue = data));
    this.globalState.cart$.subscribe((data) => {
      this.count = data.reduce(
        (accumulator, item) => accumulator + item.count,
        0
      );
    });
  }

  changeSearchValue(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this.globalState.setSearchValue(value);
  }
}
