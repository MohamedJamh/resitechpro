import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <nz-alert
      nzType="warning"
      nzCloseable
      nzMessage="Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text Warning Text"
    ></nz-alert>
  `
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  afterClose() {
    alert('Alert is closed');
  }
}
