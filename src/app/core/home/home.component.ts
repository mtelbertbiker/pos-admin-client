import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log('HomeComponent onInit');
  }
}
