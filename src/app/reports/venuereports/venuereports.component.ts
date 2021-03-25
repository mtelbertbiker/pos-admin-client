import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemUsageViewerComponent} from './itemusageviewer/itemusageviewer.component';
import {TransactiondetailviewerComponent} from './transactiondetailviewer/transactiondetailviewer.component';
import {LogService} from '../../shared/log.service';
import {DailySummaryViewerComponent} from './dailysummaryviewer/dailysummaryviewer.component';


@Component({
  selector: 'app-venuereports',
  templateUrl: './venuereports.component.html',
  styleUrls: ['./venuereports.component.scss']
})
export class VenueReportsComponent implements OnInit {
  beginDate: NgbDateStruct;
  endDate: NgbDateStruct;
  beginDateTime: string;
  endDateTime: string;
  reportName: string;
  @ViewChild(ItemUsageViewerComponent, { read: false }) itemUsageReport: ItemUsageViewerComponent;
  @ViewChild(TransactiondetailviewerComponent, { read: false }) transDetailReport: TransactiondetailviewerComponent;
  @ViewChild(DailySummaryViewerComponent, { read: false }) dailySummaryReport: DailySummaryViewerComponent;

  constructor(private router: Router, private log: LogService) { }

  ngOnInit() {
    const today = new Date();
    this.beginDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.endDate = new NgbDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
    this.setReportRange();
    const urlSections = this.router.url.split('/');
    this.reportName = urlSections[urlSections.length - 1];
  }

  refreshReport() {
    this.log.logTrace('Refresh Report: ' + this.reportName + 'Begin: ' + this.beginDateTime + '; End: ' + this.endDateTime);
    if (this.reportName === 'RentalItemUsageReport1') {
      this.itemUsageReport.doReportRefresh();
    }
    if (this.reportName === 'ItemUseDetailReport2') {
      this.transDetailReport.doReportRefresh();
    }
    if (this.reportName === 'DailySummaryReport') {
      this.dailySummaryReport.doReportRefresh();
    }
  }

  setReportRange() {
    this.beginDateTime = this.beginDate.month + '/' + this.beginDate.day + '/' + this.beginDate.year + ' 00:00';
    this.endDateTime = this.endDate.month + '/' + this.endDate.day + '/' + this.endDate.year + ' 23:59';
  }

}
