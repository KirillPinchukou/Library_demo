import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

export enum TYPES {
  EDIT,
  DELETE,
  TAKE
}

@Component({
  selector: 'confirmation',
  templateUrl: 'confirmation.component.html',
  styleUrls: ['confirmation.component.less']
})

export class ConfirmationComponent  {
  @Output() newItemEvent = new EventEmitter();
  eventType:TYPES;
  constructor(public dialog: MatDialogRef<MatDialog> ,@Inject(MAT_DIALOG_DATA) public data: TYPES) {
    this.eventType = data;
  }

  save () {
    this.dialog.close(true);
  }

  close() {
    this.dialog.close(false)
  }
}
