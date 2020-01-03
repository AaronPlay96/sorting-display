import { Component, OnInit } from '@angular/core';
import { ArrayService } from '../array.service';
import {Value} from '../Value';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private arrayService: ArrayService) {}

  ngOnInit() {
    this.arrayService.generateArray();
  }

}
