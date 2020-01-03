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
  constructor(private arrayService: ArrayService) {
  }

  ngOnInit() {
  }

  generateArray() {
    this.arrayService.generateArray(this.quantity);
  }

  sort(sortType) {
    this.selectedSort = sortType;
    this.arrayService.sort(sortType);
  }
  changeSpeed(speed) {
    this.arrayService.changeSpeed(speed);
  }
}

