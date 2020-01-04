import { Injectable } from '@angular/core';
import { Value } from './Value';


@Injectable({
  providedIn: 'root'
})
export class ArrayService {
  values: Value[] = [];
  quantity = 65;
  speedInput = 1;
  speed = 20;
  sorting = false;
  constructor() {
    this.generateArray();
  }

  generateArray(quantity: number = 65, sortType: string = 'bubbleSort') {
    this.values = [];
    this.quantity = quantity;
    for (let i = 0; i < quantity; i++) {
      this.values.push({value: (Math.floor(Math.random() * 100) + 1), type: 'primary'});
    }
    return this.values;
  }

  changeSpeed(speed) {
    this.speed = 50 / speed;
  }
  async sort(sortType) {
    if (sortType === 'Bubble Sort') {
      this.sorting = true;
      await this.bubbleSort();
      this.sorting = false;
    }
    if (sortType === 'Merge Sort') {
      this.sorting = true;
      await this.mergeSort(0, this.values.length - 1);
      this.sorting = false;
    }
    if (sortType === 'Insertion Sort') {
      this.sorting = true;
      await this.insertionSort();
      this.sorting = false;
    }
    if (sortType === 'Quick Sort') {
      this.sorting = true;
      await this.quickSort(this.values, 0, this.values.length - 1);
      this.sorting = false;
    }
    for (let i = 0; i < this.quantity; i++) {
      this.values[i].type = 'dark';
    }
  }
  async bubbleSort() {
    for (let i = 0; i < this.quantity; i++) {
      for (let j = 0; j < this.quantity - i - 1; j++) {
        this.values[j].type = 'success';
        this.values[j + 1].type = 'success';
        await this.delay(this.speed);
        if (this.values[j].value > this.values[j + 1].value) {
          this.swap(this.values, j, j + 1);
          this.values[j].type = 'danger';
          this.values[j + 1].type = 'danger';
          await this.delay(this.speed);
        }
        this.values[j].type = 'primary';
        this.values[j + 1].type = 'primary';
      }
    }
  }

  async merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L: Value[] = [];
    let R: Value[] = [];

    for (let a = 0; a < n1; a++) {
      L.push(this.values[l + a]);
    }
    for (let b = 0; b < n2; b++) {
      R.push(this.values[m + 1 + b]);
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        await this.assign(L, k, i);
        i++;
      } else {
        await this.assign(R, k, j);
        j++;
      }
      k++;
    }

    while (i < n1) {
      // this.values[k] = L[i];
      await this.assign(L, k, i);
      i++;
      k++;
    }

    while (j < n2) {
      // this.values[k] = R[j];
      await this.assign(R, k, j);
      j++;
      k++;
    }
  }

  async mergeSort(l, r) {
    if (l < r) {
      let m = l + Math.floor((r - l - 1) / 2);

      await this.mergeSort(l, m);
      await this.mergeSort(m + 1, r);

      await this.merge(l, m, r);
    }
  }

  async insertionSort() {
    for (let i = 1; i < this.quantity; i++) {
      let key = this.values[i];
      let j = i - 1;
      while (j >= 0 && key.value < this.values[j].value) {
        await this.assign(this.values, j + 1, j);
        j -= 1;
      }
      this.values[j + 1] = key;
      this.values[j + 1].type = 'success';
      await this.delay(this.speed);
      this.values[j + 1].type = 'danger';
      await this.delay(this.speed);
      this.values[j + 1].type = 'primary';
    }
  }

  async partition(arr: Value[], low: number, high: number) {
    let pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) {
      if (arr[j].value < pivot.value) {
        i++;
        arr[i].type = 'success';
        arr[j].type = 'success';
        await this.delay(this.speed);
        this.swap(arr, i, j);
        arr[i].type = 'danger';
        arr[j].type = 'danger';
        await this.delay(this.speed);
        arr[i].type = 'primary';
        arr[j].type = 'primary';
      }
    }
    arr[i + 1].type = 'success';
    arr[high].type = 'success';
    await this.delay(this.speed);
    this.swap(arr, i + 1, high);
    arr[i + 1].type = 'danger';
    arr[high].type = 'danger';
    await this.delay(this.speed);
    arr[i + 1].type = 'primary';
    arr[high].type = 'primary';
    return (i + 1);
}

  async quickSort(arr: Value[], low: number, high: number) {
    if (low < high) {
      let pi = await this.partition(arr, low, high);

      await this.quickSort(arr, low, pi - 1);
      await this.quickSort(arr, pi + 1, high);
  }
}

async assign(array: Value[], a: number, b: number) {
    this.values[a] = array[b];
    this.values[a].type = 'success';
    await this.delay(this.speed);
    this.values[a].type = 'danger';
    await this.delay(this.speed);
    this.values[a].type = 'primary';
  }

  swap(array: Value[], a: number, b: number) {
    const aux = array[a];
    array[a] = array[b];
    array[b] = aux;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
