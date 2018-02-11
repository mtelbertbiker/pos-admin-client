import {Component, Input, OnInit} from '@angular/core';
import {Licensee} from '../../../../shared/licensee.model';

@Component({
  selector: 'app-licensee-list-item',
  templateUrl: './licensee-list-item.component.html',
})
export class LicenseeListItemComponent implements OnInit {
  @Input() licensee: Licensee;
  @Input() index: number;
  @Input() rsid: number;

  ngOnInit() {
  }

}
