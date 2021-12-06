import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

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

export class ConfirmationComponent {
  @Output() newItemEvent = new EventEmitter();

  constructor(public dialog: MatDialogRef<MatDialog>) {
  }

  save() {
    this.dialog.close(true);
  }

  close() {
    this.dialog.close(false)
  }
}
