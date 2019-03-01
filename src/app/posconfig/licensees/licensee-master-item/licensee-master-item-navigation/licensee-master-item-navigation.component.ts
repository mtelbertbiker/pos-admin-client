import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-licensee-master-item-navigation',
  templateUrl: './licensee-master-item-navigation.component.html',
  styleUrls: ['./licensee-master-item-navigation.component.css']
})
export class LicenseeMasterItemNavigationComponent implements OnInit {
  @Input() id: number;

  constructor() { }

  ngOnInit() {
  }

}
