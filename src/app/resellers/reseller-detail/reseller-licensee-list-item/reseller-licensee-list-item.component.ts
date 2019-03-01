import {Component, Input, OnInit} from '@angular/core';
import {Licensee} from '../../../shared/licensee.model';

@Component({
  selector: 'app-reseller-licensee-list-item',
  templateUrl: './reseller-licensee-list-item.component.html',
})
export class ResellerLicenseeItemListComponent implements OnInit {
  @Input() licensee: Licensee;

  constructor() { }

  ngOnInit() {
  }

}
