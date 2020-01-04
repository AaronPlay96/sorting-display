import { Component, OnInit } from '@angular/core';
import { ArrayService } from '../array.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  quantity = 65;
  selectedSort = 'Bubble Sort';
  sortTypes = ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'];
  constructor(public arrayService: ArrayService) {
  }

  ngOnInit() {
  }

  generateArray() {
    if (!this.arrayService.sorting) {
      this.arrayService.generateArray(this.quantity);
    }
  }

  sort(sortType) {
    if (!this.arrayService.sorting) {
      this.selectedSort = sortType;
      this.arrayService.sort(sortType);
    }
  }

  changeSpeed(speed) {
    this.arrayService.changeSpeed(speed);
  }
}

